import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../components/FavoritePokemons';

it('should show a message when the user dont have favorite pokemons ', () => {
  const { getByText } = renderWithRouter(<FavoritePokemon />);

  const heading = getByText(/No favorite pokemon found/);
  expect(heading).toBeInTheDocument();
});

it('should show a message when the user dont have favorite pokemons ', () => {
  const pokemon = [{
    averageWeight: 2,
    id: '1x021',
    image: 'http://',
    name: 'pikachu',
    type: 'lightning',
  }];
  const { getByText } = renderWithRouter(<FavoritePokemon pokemon={ pokemon } />);

  const heading = getByText(/No favorite pokemon found/);
  expect(heading).toBeInTheDocument();
});
