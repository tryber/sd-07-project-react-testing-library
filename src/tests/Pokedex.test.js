import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('Testing the file Pokedex.js', () => {
  test('contains an h2 heading', () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const route = '/';
    history.push(route);
    const txtH2 = container.querySelector('h2');
    expect(txtH2.textContent).toBe('Encountered pokémons');
  });
  test('and the next Pokémon in the list is displayed', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const button = getByRole('button', { name: 'Próximo pokémon' });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    const poke2 = getByText(/Charmander/i);
    expect(poke2).toBeInTheDocument();
    fireEvent.click(button);
    const poke3 = getByText(/Caterpie/i);
    expect(poke3).toBeInTheDocument();
    fireEvent.click(button);
    const poke4 = getByText(/Ekans/i);
    expect(poke4).toBeInTheDocument();
    fireEvent.click(button);
    const poke5 = getByText(/Alakazam/i);
    expect(poke5).toBeInTheDocument();
    fireEvent.click(button);
    const poke6 = getByText(/Mew/i);
    expect(poke6).toBeInTheDocument();
    fireEvent.click(button);
    const poke7 = getByText(/Rapidash/i);
    expect(poke7).toBeInTheDocument();
    fireEvent.click(button);
    const poke8 = getByText(/Snorlax/i);
    expect(poke8).toBeInTheDocument();
    fireEvent.click(button);
    const poke9 = getByText(/Dragonair/i);
    expect(poke9).toBeInTheDocument();
    fireEvent.click(button);
    const poke1 = getByText(/Pikachu/i);
    expect(poke1).toBeInTheDocument();
  });

  test('shown only one Pokémon at a time', () => {
    const { getAllByText } = renderWithRouter(<App />);
    const text = getAllByText(/Average weight/i);
    expect(text.length).toBe(1);
  });

  test('Pokédex has the filter buttons', () => {
    const { getByText } = renderWithRouter(<App />);
    const button = getByText('Poison');
    fireEvent.click(button);
    const text = getByText('Ekans');
    expect(text).toBeInTheDocument();
  });

  test('button to reset the filter', () => {
    const { getByText } = renderWithRouter(<App />);
    const button = getByText('All');
    expect(button).toBeInTheDocument();
  });

  test('created a filter button for each type of Pokémon', () => {
    const { getAllByTestId, getByText, getByTestId } = renderWithRouter(<App />);
    const allTestId = getAllByTestId('pokemon-type-button');
    const seven = 7;
    expect(allTestId.length).toBe(seven);
    const button = getByText('All');
    expect(button).toBeInTheDocument();
    const btPoison = getByText('Poison');
    fireEvent.click(btPoison);
    expect(btPoison).toBeEnabled();
    const next = getByTestId('next-pokemon');
    expect(next).toBeDisabled();
  });
});
