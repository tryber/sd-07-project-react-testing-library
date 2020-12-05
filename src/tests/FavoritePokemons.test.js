import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import FavoritePokemons from '../components/FavoritePokemons';

test('se não pokémons favoritos, exibir No favorite pokemon found, ', async () => {
  const pokemons = [];
  const { getByText } = render(<FavoritePokemons pokemons={ pokemons } />);
  await getByText('No favorite pokemon found');
  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});

test('se é exibido todos os cards de pokémons favoritados', async () => {
  const history = createMemoryHistory();
  const pokemons = [
    {
      averageWeight: { value: '6.0', measurementUnit: 'kg' },
      image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      name: 'Pikachu',
      summary: 'This intelligent Pokémon roasts hard berries with electricity'
      + 'to make them tender enough to eat.',
      type: 'Electric' },
    {
      averageWeight: { value: '8.5', measurementUnit: 'kg' },
      image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
      name: 'Charmander',
      summary: 'The flame on its tail shows the strength of its life force.'
      + 'If it is weak, the flame also burns weakly.',
      type: 'Fire' }];
  const { getByText } = render(
    <Router history={ history }><FavoritePokemons pokemons={ pokemons } /></Router>
  );
  await getByText('Pikachu');
  expect(getByText('Pikachu')).toBeInTheDocument();
  await getByText('Charmander');
  expect(getByText('Charmander')).toBeInTheDocument();
});

test('nenhum card de pokémon é exibido, se ele não estiver favoritado.', async () => {
  const history = createMemoryHistory();
  const pokemons = [];
  const { getByText } = render(
    <Router history={ history }>
      <FavoritePokemons pokemons={ pokemons } />
    </Router>);
  await getByText('No favorite pokemon found');
  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});
