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
  it('exists one button for each Pokémon type', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const selectedButtons = getAllByTestId('pokemon-type-button');
    const numberOfButtons = 7;
    expect(selectedButtons.length).toBe(numberOfButtons);
  });
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
    const { getByTestId } = renderWithRouter(<App />);
    const nextButton = getByTestId('next-pokemon');
    const secondPokemon = getByTestId('pokemon-name');
    const expectedPokemon = 'Charmander';
    fireEvent.click(nextButton);
    expect(secondPokemon.textContent).toBe(expectedPokemon);
  });
  it('filter is dinamically created for each Pokémon type', () => {
    // Fonte: Estudante Zezo Menon
    const { getAllByTestId } = renderWithRouter(<App />);
    const lengthTypeButton = [...new Set(pokemons.map((pokemon) => pokemon.type))];
    const filterButtons = getAllByTestId(/pokemon-type-button/i);
    expect(filterButtons.length).toBe(lengthTypeButton.length);
  });
  it('disables "Next Pokémon" when there is only one for that type', () => {
    const { getByText } = renderWithRouter(<App />);
    const typeDragonButton = getByText('Dragon', { selector: 'button' });
    fireEvent.click(typeDragonButton);
    expect(getByText(/Próximo pokémon/i)).toBeDisabled();
  });
});
