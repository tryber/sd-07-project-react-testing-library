import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouters from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const favoritesPokemons = {
  25: true,
  4: false,
  10: true,
  23: false,
  65: true,
  151: false,
  78: false,
  143: true,
  148: false,
};

function nextPokemon(get, button, pok) {
  const magicNumber = 0;
  if (pok.length > magicNumber) {
    pok.forEach((pokemon) => {
      expect(get(pokemon.name)).toBeInTheDocument();
      fireEvent.click(button);
    });
  } else {
    expect(get(pokemon.name)).toBeInTheDocument();
    expect(button).toBeDisabled();
  }
}

test('If page have a heading with text Encountered pokémons', () => {
  const { getByRole } = renderWithRouters(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritesPokemons }
    />,
  );
  expect(getByRole('heading').textContent).toBe('Encountered pokémons');
});

describe('Testing Pokemon Change List', () => {
  test('if have a button to click for next pokemon', () => {
    const { getByText } = renderWithRouters(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritesPokemons }
      />,
    );
    expect(getByText('Próximo pokémon')).toBeInTheDocument();
  });

  test('if show next pokemons', () => {
    const { getByText } = renderWithRouters(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritesPokemons }
      />,
    );
    const buttonNextPokemon = getByText('Próximo pokémon');
    nextPokemon(getByText, buttonNextPokemon, pokemons);
  });

  test('if when click on next on last pokemon will show first pokemon', () => {
    const { getByText } = renderWithRouters(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritesPokemons }
      />,
    );
    const buttonNextPokemon = getByText('Próximo pokémon');
    nextPokemon(getByText, buttonNextPokemon, pokemons);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});

test('if are showing only one pokemon on window', () => {
  const { getAllByText } = renderWithRouters(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritesPokemons }
    />,
  );

  expect(getAllByText('More details').length).toBe(1);
});

describe('Testing filter buttons', () => {
  test('if pokedex turn only on filter selection', () => {
    const { getByText, getByRole } = renderWithRouters(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritesPokemons }
      />,
    );

    const buttonNextPokemon = getByText('Próximo pokémon');
    const pokemonsTypes = [...new Set(pokemons.map(({ type }) => type))];
    pokemonsTypes.forEach((type) => {
      const buttonType = getByRole('button', { name: type });
      const pokemonsType = pokemons.filter((pokemon) => pokemon.type === type);
      fireEvent.click(buttonType);
      expect(getByText(pokemonsType[0].name)).toBeInTheDocument();

      nextPokemon(getByText, buttonNextPokemon, pokemonsType);
    });
  });

  test('if have a button ALL', () => {
    const { getByText } = renderWithRouters(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritesPokemons }
      />,
    );
    expect(getByText('All')).toBeInTheDocument();
  });

  test('if after clicl on All, all pokemons are available to show', () => {
    const { getByText } = renderWithRouters(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritesPokemons }
      />,
    );
    const buttonAll = getByText('All');
    const buttonNextPokemon = getByText('Próximo pokémon');

    fireEvent.click(buttonAll);

    nextPokemon(getByText, buttonNextPokemon, pokemons);
  });

  test('if have buttons for all types of pokemons', () => {
    const { getAllByTestId } = renderWithRouters(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritesPokemons }
      />,
    );
    const typeOfPokemons = [...new Set(pokemons.map(({ type }) => type))];
    expect(getAllByTestId('pokemon-type-button').length).toBe(typeOfPokemons.length);
  });
});
