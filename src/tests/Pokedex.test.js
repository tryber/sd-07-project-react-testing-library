import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';

describe('Testing Pokedex.js file', () => {
  const favoritePokemonList = {
    4: false,
    10: false,
    23: true,
    25: true,
    65: false,
    78: false,
    143: false,
    148: false,
    151: true,
  };

  test('the page contains heading with the text `Encountered pokémons`', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonList }
      />,
    );
    expect(screen.getByRole('heading', { name: 'Encountered pokémons' }));
  });

  test('shows the next Pokemon when `Próximo pokémon` button is clicked', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonList }
      />,
    );

    const firstPokemon = pokemons[0].name;
    const lastPokemon = pokemons[pokemons.length - 1].name;

    expect(screen.getByTestId('next-pokemon')).toHaveTextContent('Próximo pokémon');
    fireEvent.click(screen.getByTestId('next-pokemon'));
    expect(screen.getByText('Charmander')).toBeInTheDocument();

    for (let i = 1; i < (pokemons.length - 1); i += 1) {
      fireEvent.click(screen.getByTestId('next-pokemon'));
    }

    expect(screen.getByText(lastPokemon)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('next-pokemon'));
    expect(screen.getByText(firstPokemon)).toBeInTheDocument();
  });

  test('only one Pokemon appears', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonList }
      />,
    );

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.queryByText('Mew')).not.toBeInTheDocument();
  });

  test('the page contains filtering buttons', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonList }
      />,
    );

    const SEVEN = 7;
    expect(screen.getAllByTestId('pokemon-type-button').length).toBe(SEVEN);

    const fireTypeButton = screen.getAllByTestId('pokemon-type-button')[1];

    fireEvent.click(fireTypeButton);
    expect(screen.getByTestId('pokemonType')).toHaveTextContent('Fire');
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('next-pokemon'));
    expect(screen.getByText('Rapidash')).toBeInTheDocument();
    expect(fireTypeButton).toHaveTextContent('Fire');
  });

  test('the page contains reset filtering button', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonList }
      />,
    );

    const allTypesButton = screen.getAllByRole('button')[0];
    expect(allTypesButton).toHaveTextContent('All');
    fireEvent.click(allTypesButton);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  test('shows one button for each Pokemon type', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonList }
      />,
    );

    const pokemonsTypeList = screen.queryAllByTestId('pokemon-type-button');
    const allTypesButton = screen.getAllByRole('button')[0];

    expect(allTypesButton).toHaveTextContent('All');
    expect(pokemonsTypeList[0]).toHaveTextContent('Electric');
    expect(pokemonsTypeList[1]).toHaveTextContent('Fire');
    expect(pokemonsTypeList[2]).not.toHaveTextContent('Fire');
    expect(pokemonsTypeList[3]).toHaveTextContent('Poison');
    expect(pokemonsTypeList[4]).not.toHaveTextContent('Normal');
    expect(pokemonsTypeList[5]).toHaveTextContent('Normal');
    expect(pokemonsTypeList[6]).toHaveTextContent('Dragon');
  });

  test('shows `Próximo pokémon` button disable when filtered list has only one Pokemon',
    () => {
      renderWithRouter(
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ favoritePokemonList }
        />,
      );

      const electricTypeButton = screen.getAllByTestId('pokemon-type-button')[0];

      fireEvent.click(electricTypeButton);
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
      expect(screen.getByTestId('next-pokemon')).toBeDisabled();
    });
});
