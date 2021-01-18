import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import RenderWithRouter from './RenderWithRouter';
import pokemons from '../data';

describe('Test4 - FavoritePokemons.js', () => {
  it('should have on screen No favorite pokemon found', () => {
    const { getByText } = RenderWithRouter(<FavoritePokemons />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('should to present all favorite pokemons', () => {
    const { getByText } = RenderWithRouter(<FavoritePokemons pokemons={ pokemons }/>, );
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('should no pokemon card on screen if dont have no one favorited ', () => {
    const { container } = RenderWithRouter(<FavoritePokemons />);
    const pokeCard = container.querySelector('pokemon');
    expect(pokeCard).not.toBeInTheDocument();
  });
});
