import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Testando o arquivo FavoritePokemons.js', () => {
  it('exibe No favorite pokemon found se a pessoa não tiver pokémons favoritos', () => {
    const { getByText } = render(<FavoritePokemons />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('são exibidos todos os cards de pokémons favoritados', () => {
    const { getByText } = render(<FavoritePokemons />);
    const favoritePokemons = [pokemons[0], pokemons[1]];
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getByText('Charmander')).toBeInTheDocument();
  });

  it('nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { queryByText } = render(<FavoritePokemons />);
    const favoritePokemons = [];
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);
    expect(queryByText('Pikachu')).not.toBeInTheDocument();
    expect(queryByText('Charmander')).not.toBeInTheDocument();
    expect(queryByText('Snorlax')).not.toBeInTheDocument();
  });
});
