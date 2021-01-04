import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testando o arquivo FavoritePokemons.js', () => {
  test('Se não há favoritos, exibe mensagem "No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const favoritePokemon = [pokemons[0], pokemons[1]];
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemon } />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

  test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const favoritePokemon = [];
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemon } />);
    expect(screen.queryByText('Caterpie')).not.toBeInTheDocument();
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
  });
});
