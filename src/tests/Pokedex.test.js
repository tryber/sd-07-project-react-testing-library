import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRender from '../helpers/renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('Testing the Pokedex.js file', () => {
  it('page contains an h2 heading with the text Encountered Pokémon', () => {
    const { getByText } = renderWithRender(<App />);
    const H2 = getByText(/Encountered pokémons/i);
    expect(H2.tagName).toBe('H2');
  });
  it('the next Pokémon in the list is displayed', () => {
    const { getByText, getByTestId } = renderWithRender(<App />);
    const nextPokemon = getByText(/Próximo pokémon/i);
    fireEvent.click(nextPokemon);
    const nextPokemonInPokedex1 = getByTestId('pokemon-name');
    expect(nextPokemonInPokedex1.innerHTML).toBe('Charmander');
    fireEvent.click(nextPokemon);
    const nextPokemonInPokedex2 = getByText(/Caterpie/i);
    expect(nextPokemonInPokedex2).toBeInTheDocument();
  });
  it('the Pokédex contains a button to reset the filter', () => {
    const { getByText, getAllByTestId } = renderWithRender(<App />);
    const pokemonTypeButton = getAllByTestId('pokemon-type-button');
    pokemonTypeButton.map((button) => expect(button).toBeInTheDocument());
    fireEvent.click(getByText(/Psychic/i));
    const FilterByType1 = getByText(/Alakazam/i);
    expect(FilterByType1).toBeInTheDocument();
    fireEvent.click(getByText(/Bug/i));
    const FilterByType2 = getByText(/Caterpie/i);
    expect(FilterByType2).toBeInTheDocument();
    fireEvent.click(getByText(/All/i));
    const FilterByType3 = getByText(/Pikachu/i);
    expect(FilterByType3).toBeInTheDocument();
  });
});
