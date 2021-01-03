import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testando o arquivo FavoritePokemons.js', () => {
  test('se é exibido No favorite pokemon found, se não tiver pokémons favoritos.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavoritPoke = getByText(/No favorite pokemon found/i);
    expect(noFavoritPoke).toBeInTheDocument();
  });

  it('se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const favoritePoke = [pokemons[0]];
    renderWithRouter(<FavoritePokemons pokemons={ favoritePoke } />);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons />);
    const favoritePoke = [];
    renderWithRouter(<FavoritePokemons pokemons={ favoritePoke } />);
    expect(queryByText('Pikachu')).not.toBeInTheDocument();
  });
});
