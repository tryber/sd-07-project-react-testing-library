import React from 'react';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Testando o arquivo FavoritePokemons.js', () => {
  const listFavorites = [pokemons[2], pokemons[3]];
  test('Teste se é exibido na tela a mensagem No favorite pokemon found.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText(/no favorite pokemon found/i)).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ listFavorites } />,
    );
    expect(getByText(/Caterpie/i)).toBeInTheDocument();
    expect(getByText(/Ekans/i)).toBeInTheDocument();
  });
  test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { queryByText } = renderWithRouter(
      <FavoritePokemons pokemons={ listFavorites } />,
    );
    expect(queryByText(/charmander/i)).toBeNull();
  });
});
