import React from 'react';
import { cleanup } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

afterEach(cleanup);

it(`Teste se é exibido na tela a mensagem No favorite pokemon found,
    se a pessoa não tiver pokémons favoritos.`, () => {
  renderWithRouter(<FavoritePokemons />);
  expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
});

it(`Teste se é exibido todos os 
  cards de pokémons favoritados.`, () => {
  renderWithRouter(<FavoritePokemons pokemons={ [pokemons[0], pokemons[1]] } />);
  expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
  expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
});

it(`Teste se nenhum card de pokémon é exibido, 
    se ele não estiver favoritado.`, () => {
  renderWithRouter(<FavoritePokemons pokemons={ [pokemons[0], pokemons[1]] } />);
  expect(screen.queryByText(/Dragonair/i)).not.toBeInTheDocument();
});
