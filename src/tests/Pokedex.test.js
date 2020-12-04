import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pokemonList = [
  'Cartepie', 'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];

describe('test Pokedex component', () => {
  it('render a next pokemon when click in `Próximo pokémon`', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const button = getByRole('button', { name: 'Próximo pokémon' });
    const title = getByText(/Encountered pokémons/i);
    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    fireEvent.click(button);
    const charmander = getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
    pokemonList.forEach(() => fireEvent.click(button));
    const dragonair = getByText(/Dragonair/i);
    expect(dragonair).toBeInTheDocument();
    fireEvent.click(button);
    expect(pikachu).toBeInTheDocument();
  });

  it('option to filter by type', () => {
    const { getByRole } = renderWithRouter(<App />);
    const psychic = getByRole('button', { name: 'Psychic' });
    fireEvent.click(psychic);
    expect(psychic).toBeEnabled();
  });

  it('button to reset the filter', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const button = getByRole('button', { name: 'All' });
    const btnNext = getByRole('button', { name: 'Próximo pokémon' });
    fireEvent.click(btnNext);
    const charmander = getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
    fireEvent.click(button);
    const pikachu = getByText(/Pikachu/i);
    expect(button).toBeEnabled();
    expect(pikachu).toBeInTheDocument();
    fireEvent.click(btnNext);
    expect(charmander).toBeInTheDocument();
  });

  it('filter button for type of Pokémon', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const allTypes = getAllByTestId('pokemon-type-button');
    const seven = 7;
    expect(allTypes.length).toBe(seven);
  });
});
