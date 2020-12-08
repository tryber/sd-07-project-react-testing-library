import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemon from '../components/FavoritePokemons';

it('Verifica se há mensagem, se não o usuário não tiver pokémons favoritos', () => {
  const { getByText } = renderWithRouter(<FavoritePokemon />);

  const heading = getByText(/No favorite pokemon found/);
  expect(heading).toBeInTheDocument();
});

it('Verifica se nenhum card é exibido, se não houver pokemon favorito', () => {
  const pokemon = [{
    averageWeight: 2,
    id: '1x021',
    name: 'pikachu',
    type: 'lightning',
    image: 'http://',
  }];

  const { getByText } = renderWithRouter(<FavoritePokemon pokemon={ pokemon } />);
  const heading = getByText(/No favorite pokemon found/);
  expect(heading).toBeInTheDocument();
});
