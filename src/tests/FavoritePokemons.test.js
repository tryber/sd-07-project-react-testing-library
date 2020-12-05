import React from 'react';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Testando o arquivo FavoritePokemons.js', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText(/no favorite pokemon found/i)).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    expect(getByText(/Caterpie/i)).toBeInTheDocument();
    expect(getByText(/Ekans/i)).toBeInTheDocument();
  });
  test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    expect(queryByText(/pikachu/i)).toBeNull();
  });
});
