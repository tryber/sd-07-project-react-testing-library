import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const data = pokemons;
const favoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Testando o arquivo Pokedex.js', () => {
  it('Test if the page contains an h2 heading with the text Encountered Pokémon.', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ favoriteById } />,
    );
    const heading = getByText(/Encountered pokémons/i);
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
    expect(heading.innerHTML).toBe('Encountered pokémons');
  });

  it('displays next Pokémon in the list when the Next Pokémon button is clicked.', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ favoriteById } />,
    );
    const nextPokemon = getByTestId('next-pokemon');
    expect(nextPokemon.innerHTML).toBe('Próximo pokémon');

    fireEvent.click(nextPokemon);
    const charmander = getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
  });

  it('Test if only one Pokémon is shown at a time.', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ favoriteById } />,
    );
    const buttonNext = getByTestId('next-pokemon');
    fireEvent.click(buttonNext);
    const charmander = getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
    fireEvent.click(buttonNext);
    const caterpie = getByText(/Caterpie/i);
    expect(caterpie).toBeInTheDocument();
    fireEvent.click(buttonNext);
    const ekans = getByText(/Ekans/i);
    expect(ekans).toBeInTheDocument();
    fireEvent.click(buttonNext);
    const alakazam = getByText(/Alakazam/i);
    expect(alakazam).toBeInTheDocument();
    fireEvent.click(buttonNext);
    const mew = getByText(/Mew/i);
    expect(mew).toBeInTheDocument();
    fireEvent.click(buttonNext);
    const rapidash = getByText(/Rapidash/i);
    expect(rapidash).toBeInTheDocument();
    fireEvent.click(buttonNext);
    const snorlax = getByText(/Snorlax/i);
    expect(snorlax).toBeInTheDocument();
    fireEvent.click(buttonNext);
    const dragonair = getByText(/Dragonair/i);
    expect(dragonair).toBeInTheDocument();
    fireEvent.click(buttonNext);
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  it('verify if the Pokédex has the filter buttons.', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ favoriteById } />,
    );
    const buttons = getAllByTestId('pokemon-type-button');
    const length = 7;
    expect(buttons.length).toBe(length);
  });

  it('Test if the Pokédex contains a button to reset the filter', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ favoriteById } />,
    );
    const button = getByText('All');
    expect(button).toBeInTheDocument();
  });

  it('a filter button is created dynamically for each type of Pokémon.', () => {
    const types = data.map((pokemon) => pokemon.type);
    const filterTypes = types.filter((type, index) => types.indexOf(type) === index);

    const { queryAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ favoriteById } />,
    );

    const btnsTypes = queryAllByTestId('pokemon-type-button');
    expect(btnsTypes.length).toBe(filterTypes.length);
  });

  it('The Next Pokémon button disables when you have only one Pokémon.', () => {
    const { getByTestId, getAllByText } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ favoriteById } />,
    );
    const nextButton = getByTestId('next-pokemon');

    const electricButton = getAllByText(/Electric/i)[1];
    fireEvent.click(electricButton);
    expect(nextButton.disabled).toBe(true);

    const bugButton = getAllByText(/Bug/i)[0];
    fireEvent.click(bugButton);
    expect(nextButton.disabled).toBe(true);
  });
});
