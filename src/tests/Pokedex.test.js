import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Testing the Pokedex.js file', () => {
  it('Shold to test if the page contains the text Encountered Pokémon.', () => {
    const { container } = renderWithRouter(<App />);
    const tagH2 = container.querySelector('h2').innerHTML;
    expect(tagH2).toBe('Encountered pokémons');
  });
  it('Should if the next Pokémon is displayed when the same button is clicked.', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const firstPokemon = getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
    const btnNextPokemon = getByTestId('next-pokemon');
    expect(btnNextPokemon.innerHTML).toBe('Próximo pokémon');
    fireEvent.click(btnNextPokemon);
    const secondPokemon = getByText(/Charmander/i);
    expect(secondPokemon).toBeInTheDocument();
  });
  it('Should to show only one Pokémon is shown at a time.', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const firstPokemon = getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
    const btnNextPokemon = getByTestId('next-pokemon');
    fireEvent.click(btnNextPokemon);
    const secondPokemon = getByText(/Charmander/i);
    expect(secondPokemon).toBeInTheDocument();
    fireEvent.click(btnNextPokemon);
    const thirthPokemon = getByText(/Caterpie/i);
    expect(thirthPokemon).toBeInTheDocument();
    fireEvent.click(btnNextPokemon);
    fireEvent.click(btnNextPokemon);
    fireEvent.click(btnNextPokemon);
    fireEvent.click(btnNextPokemon);
    fireEvent.click(btnNextPokemon);
    fireEvent.click(btnNextPokemon);
    fireEvent.click(btnNextPokemon);
    expect(firstPokemon).toBeInTheDocument();
  });
  it('Should to test if the Pokédex has the filter buttons.', () => {
    
  });
});
