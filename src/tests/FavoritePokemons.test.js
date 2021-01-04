import React from 'react';
import { cleanup } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import RenderWithRouter from './RenderWithRouter';

afterEach(cleanup);

const pokemons = [
  {
    id: 1,
    averageWeight: { value: '6.0', measurementUnit: 'kg' },
    name: 'Pikachu',
    type: 'Electric',
  },
  {
    id: 2,
    averageWeight: { value: '95', measurementUnit: 'kg' },
    name: 'Rapidash',
    type: 'Fire',
  },
];

const RenderWithPokemons = (Pokemons) => (
  RenderWithRouter(<FavoritePokemons pokemons={ Pokemons } />)
);

test(
  'if the message No favorite pokemon found is displayed on the screen,'
    + ' if the person does not have favorite pokemon',
  () => {
    const { getByText } = RenderWithRouter(<FavoritePokemons />);
    const msg = getByText('No favorite pokemon found');
    expect(msg).toBeInTheDocument();
  },
);

test('whether all favorite Pokémon cards are displayed', () => {
  const { queryAllByTestId } = RenderWithPokemons(pokemons);
  const name = queryAllByTestId('pokemon-name');
  const type = queryAllByTestId('pokemonType');
  const weight = queryAllByTestId('pokemon-weight');
  expect(name[0]).toHaveTextContent('Pikachu');
  expect(type[0]).toHaveTextContent('Electric');
  expect(weight[0]).toHaveTextContent('Average weight: 6.0 kg');
  expect(name[1]).toHaveTextContent('Rapidash');
  expect(type[1]).toHaveTextContent('Fire');
  expect(weight[1]).toHaveTextContent('Average weight: 95 kg');
});

test('if no Pokémon card is displayed, if it is not favored', () => {
  const { container } = RenderWithPokemons(undefined);
  const PokemonCard = container.querySelector('.pokemon-overview');
  expect(PokemonCard).not.toBeInTheDocument();
});
