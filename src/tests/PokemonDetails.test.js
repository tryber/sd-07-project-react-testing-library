import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

import PokemonDetails from '../components/PokemonDetails';

import data from '../data';

afterEach(() => {
  cleanup();
});

const pokemon = data[0];

test('if pokemon details appear in the screen', () => {
  const favoritePokemon = () => { };
  const { getByText } = renderWithRouter(
    <PokemonDetails
      match={ { params: { id: '25' } } }
      isPokemonFavoriteById={ { 25: false } }
      pokemons={ data }
      onUpdateFavoritePokemons={ favoritePokemon }
    />,
  );

  const detailText = getByText('Pikachu Details');
  const headingElement = getByText('Summary');
  const summaryParagraph = getByText(pokemon.summary);

  expect(detailText).toBeInTheDocument();
  expect(headingElement).toBeInTheDocument();
  expect(summaryParagraph).toBeInTheDocument();
});

test('if there is a map section', () => {
  const { foundAt } = pokemon;
  const favoritePokemon = () => { };
  const { getByText, getAllByRole } = renderWithRouter(
    <PokemonDetails
      match={ { params: { id: '25' } } }
      isPokemonFavoriteById={ { 25: false } }
      pokemons={ data }
      onUpdateFavoritePokemons={ favoritePokemon }
    />,
  );

  const headingElement = getByText('Game Locations of Pikachu');
  const location1 = getByText(foundAt[0].location);
  const location2 = getByText(foundAt[1].location);
  const maps = getAllByRole('img');

  expect(headingElement).toBeInTheDocument();
  expect(location1).toBeInTheDocument();
  expect(location2).toBeInTheDocument();

  expect(maps[1].src).toBe(foundAt[0].map);
  expect(maps[2].src).toBe(foundAt[1].map);

  expect(maps[1].alt).toBe('Pikachu location');
  expect(maps[2].alt).toBe('Pikachu location');
});

test('if user is able to add as favorite', () => {
  const favoritePokemon = () => { };
  const { getByLabelText } = renderWithRouter(
    <PokemonDetails
      match={ { params: { id: '25' } } }
      isPokemonFavoriteById={ { 25: false } }
      pokemons={ data }
      onUpdateFavoritePokemons={ favoritePokemon }
    />,
  );

  const favoriteCheck = getByLabelText('Pokémon favoritado?');

  expect(favoriteCheck).toBeInTheDocument();
  expect(favoriteCheck.checked).toBe(false);
});
