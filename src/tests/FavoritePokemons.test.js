import React from 'react';
import { fireEvent } from '@testing-library/react';
import RenderWithRouter from '../RenderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Tests use cases for component FavoritePokemons', () => {
  it(
    'should render the message `No favorite pokemon found` if theres no favorite pokemon',
    () => {
      const { getByText } = RenderWithRouter(<FavoritePokemons />);
      expect(getByText(/^No favorite pokemon foun/i)).toBeInTheDocument();
    },
  );

  it('should render all favorite pokemons cards', () => {
    const { getByText } = RenderWithRouter(<App />);
    fireEvent.click(getByText(/^More details$/i));
    fireEvent.click(getByText(/Pokémon favoritado?/i));
    const empty = 0;
    const { getAllByRole } = RenderWithRouter(<FavoritePokemons />);
    const images = getAllByRole('img');
    expect(images.length).not.toBe(empty);
  });
});
