import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

let pokemon = [];

test(`Testa se é exibido na tela a mensagem "No favorite pokemon found",se a pessoa não
tiver pokémons favoritos.`, () => {
  const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemon } />);

  const noFavorites = queryByText('No favorite pokemon found');
  
  expect(noFavorites).toBeInTheDocument();
});

test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
  pokemon = [pokemons[0], pokemons[1]];
  const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemon } />);

  const favoritePikachu = queryByText('Pikachu');
  const favoriteChamander = queryByText('Charmander');

  expect(favoritePikachu).toBeInTheDocument();
  expect(favoriteChamander).toBeInTheDocument();
});
