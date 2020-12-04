import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemon from '../components/FavoritePokemons';

const pokemons = [{
  name: 'pikachu',
  type: 'eletric',
  averageWeight: { value: '5', measurementUnit: 'kg' },
},
{
  name: 'charizard',
  type: 'fire',
  averageWeight: { value: '20', measurementUnit: 'kg' },
}];
const Rendering = (array) => renderWithRouter(
  <FavoritePokemon pokemons={ array } />,
);

test('Testando se é exibido na tela "No favorite pokemon found".', () => {
  const { getByText } = renderWithRouter(<FavoritePokemon />);
  const noFavoritesFound = getByText(/No favorite pokemon found/i);

  expect(noFavoritesFound).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
  const { queryAllByTestId, container } = Rendering(pokemons);

  const favoritedPokemon = container.querySelector('div.pokemon-overview');
  const pokemonNames = queryAllByTestId('pokemon-name');
  const pokemonType = queryAllByTestId('pokemonType');
  const pokemonAvarageWeight = queryAllByTestId('pokemon-weight');

  expect(favoritedPokemon).toBeInTheDocument();

  expect(pokemonNames[0]).toHaveTextContent('pikachu');
  expect(pokemonType[0]).toHaveTextContent('eletric');
  expect(pokemonAvarageWeight[0]).toHaveTextContent('Average weight: 5 kg');

  expect(pokemonNames[1]).toHaveTextContent('charizard');
  expect(pokemonType[1]).toHaveTextContent('fire');
  expect(pokemonAvarageWeight[1]).toHaveTextContent('Average weight: 20 kg');
});

test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
  const { container, getByText } = Rendering(undefined);

  const favoritedPokemon = container.querySelector('div.pokemon-overview');
  const noFavoritesFound = getByText(/No favorite pokemon found/i);

  expect(favoritedPokemon).not.toBeInTheDocument();
  expect(noFavoritesFound).toBeInTheDocument();
});
