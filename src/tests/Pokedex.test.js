import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Pokedéx component is rendering correctly', () => {
  it('page displays a heading containing the text "Encountered pokémons"', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const expectedText = /Encountered pokémons/i;
    expect(getAllByRole('heading')[1]).toHaveTextContent(expectedText);
  });
  it('renders only one pokémon in the page', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });
});

describe('Next pokemon is rendered when clicked in next button', () => {
  it('button text is "Próximo pokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const expectedButtonText = /Próximo pokémon/i;
    const button = getByTestId('next-pokemon');
    expect(button).toHaveTextContent(expectedButtonText);
  });
  it('if clicked in the button, the next pokemon is shown', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const button = getByTestId('next-pokemon');
    pokemons.forEach((pokemon) => {
      const actualPokemon = getByText(pokemon.name);
      fireEvent.click(button);
      expect(actualPokemon).toBeInTheDocument();
    });
  });
});

describe('Pokédex filters are working correctly', () => {
  it('rotates pokémons only in selected pokémon type', () => {
    // Fonte: Estudante Ana Karine
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const actualPokemonType = getByTestId('pokemonType');
    const allPokemonType = getAllByTestId('pokemon-type-button');
    allPokemonType.forEach((type) => {
      fireEvent.click(type);
      expect(type.textContent).toBe(actualPokemonType.textContent);
    });
  });
  it('contains a button to reset the filter', () => {
    const { getByText } = renderWithRouter(<App />);
    const button = getByText(/All/i);
    expect(button).toBeInTheDocument();
  });
  it('filter "All" is selected by default', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const nextButton = getByTestId('next-pokemon');
    const secondPokemon = getByText(/Charmander/i);
    fireEvent.click(nextButton);
    expect(secondPokemon).toBeInTheDocument();
  });
});
