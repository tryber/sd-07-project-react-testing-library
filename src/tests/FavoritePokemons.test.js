import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemon from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Testando o arquivo de favoritos', () => {
  test('se não houver favoritos exibir uma mensagem', () => {
    renderWithRouter(<FavoritePokemon />);
    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  test('se exibi todas as informações de um pokemon favoritado', () => {
    const favoritePokemon = [pokemons[0], pokemons[1]];
    renderWithRouter(<FavoritePokemon pokemons={ favoritePokemon } />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(screen.queryByText('Alakazam')).not.toBeInTheDocument();
  });
});
