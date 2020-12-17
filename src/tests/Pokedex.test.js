import React from 'react';
import { fireEvent, getByTestId } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('5. Testing the Pokedex.js file', () => {
  it('The page contains an h2 heading with the text Encountered Pokémon', () => {
    const pokemon = [...pokemons];
    const favorites = { 0: true };
    const { container } = renderWithRouter(<Pokedex pokemons={ pokemon } isPokemonFavoriteById={ favorites } />);
    const heading = container.querySelector('h2');
    expect(heading.innerHTML).toContain('Encountered pokémons');
  });

  it('The next Pokémon in the list is displayed when the Next Pokémon button is clicked.', () => {
    const pokemon = [...pokemons];
    const favorites = { 0: true };
    const { getByText, getByTestId } = renderWithRouter(<Pokedex pokemons={ pokemon } isPokemonFavoriteById={ favorites } />);
    // O botão deve conter o texto Próximo pokémon;
    const button = getByText(/Próximo pokémon/i);
    expect(button).toBeInTheDocument();
    // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
    fireEvent.click(button);
    const nextPokemon1 = getByTestId('pokemon-name');
    expect(nextPokemon1).toHaveTextContent(/Charmander/i);
    fireEvent.click(button);
    const nextPokemon2 = getByTestId('pokemon-name');
    expect(nextPokemon2).toHaveTextContent(/Caterpie/i);
    // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
    const buttonReset = getByText(/All/i);
    pokemons.forEach(() => fireEvent.click(buttonReset));
    const firstPokemon = getByTestId('pokemon-name');
    expect(firstPokemon ).toHaveTextContent(/Pikachu/i);
  });

  it('Only one Pokémon is shown at a time.', () => {
    const pokemon = [...pokemons];
    const favorites = { 0: true };
    const { container } = renderWithRouter(<Pokedex pokemons={ pokemon } isPokemonFavoriteById={ favorites } />);
    const displayedPokemons = container.querySelectorAll('div.pokemon');
    const displayedLength = 1;
    expect(displayedPokemons.length).toBe(displayedLength);
  });

  it('The next Pokémon in the list is displayed when the Next Pokémon button is clicked.', () => {
    const pokemon = [...pokemons];
    const favorites = { 0: true };
    const { getByText, getByTestId } = renderWithRouter(<Pokedex pokemons={ pokemon } isPokemonFavoriteById={ favorites } />);
    const buttonFilter = getByText(/Fire/i);
    fireEvent.click(buttonFilter);
    const typePokemon = getByTestId('pokemonType');
    expect(typePokemon ).toHaveTextContent(/Fire/i);
    fireEvent.click(buttonFilter);
    expect(typePokemon ).toHaveTextContent(/Fire/i);
    fireEvent.click(buttonFilter);
    expect(typePokemon ).toHaveTextContent(/Fire/i);
  });

  it('Pokédex contains a button to reset the filter.', () => {
    const pokemon = [...pokemons];
    const favorites = { 0: true };
    const { getByText, getByTestId } = renderWithRouter(<Pokedex pokemons={ pokemon } isPokemonFavoriteById={ favorites } />);
    const buttonReset = getByText(/All/i);
    expect(buttonReset).toBeInTheDocument();
    const firstPokemon = getByTestId('pokemon-name');
    expect(firstPokemon ).toHaveTextContent(/Pikachu/i);
    const typePokemon1 = getByTestId('pokemonType');
    expect(typePokemon1 ).toHaveTextContent(/Electric/i);
    const button = getByText(/Próximo pokémon/i);
    fireEvent.click(button);
    const typePokemon2 = getByTestId('pokemonType');
    expect(typePokemon2 ).toHaveTextContent(/Fire/i);
  });

  it('A filter button is created dynamically for each type of Pokémon.', () => {
    const pokemon = [...pokemons];
    const favorites = { 0: true };
    const { getByText, queryAllByTestId } = renderWithRouter(<Pokedex pokemons={ pokemon } isPokemonFavoriteById={ favorites } />);
    const buttonTypes = queryAllByTestId('pokemon-type-button');
    const typesLength = 7;
    expect(buttonTypes.length).toBe(typesLength);
    const expectedTypes = [ 'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon' ];
    buttonTypes.forEach((type, index) => expect(type).toHaveTextContent(expectedTypes[index]));
    const buttonReset = getByText(/All/i);
    expect(buttonReset).toBeInTheDocument();
  });

  it('The Next Pokémon button should be disabled when the filtered list of Pokémon has only one Pokémon.', () => {
    const pokemon = [...pokemons];
    const favorites = { 0: true };
    const { getByText } = renderWithRouter(<Pokedex pokemons={ pokemon } isPokemonFavoriteById={ favorites } />);
    const buttonFilter = getByText(/Bug/i);
    fireEvent.click(buttonFilter);
    const button = getByText(/Próximo pokémon/i);
    expect(button).toHaveAttribute('disabled');
  });
});
