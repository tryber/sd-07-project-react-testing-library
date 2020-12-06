import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import RenderWithRouter from './RenderWithRouter';
import pokemons from '../data';

describe('Test 4 - FavoritePokemons.js', () => {
  it('Should have on creen \'No favorite pokemon found\'', () => {
    const { getByText } = RenderWithRouter(<FavoritePokemons />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });
  it('Should to present all favorite pokemons', () => {
    const { getByText } = RenderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
  it('should no pokemon card on screen if don\'thave no one favorited.', () => {
    const { container } = RenderWithRouter(<FavoritePokemons />);
    const pokeCard = container.querySelector('pokemon');
    expect(pokeCard).not.toBeInTheDocument();
  });
});
