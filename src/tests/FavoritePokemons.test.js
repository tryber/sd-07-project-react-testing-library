import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import mockedData from './mockedFavoritesPokemons';

describe('renders the FavoritePokemons screen', () => {
  it('renders no favorites pokemons', () => {
    render(<FavoritePokemons pokemons={ [] } />, { wrapper: MemoryRouter });
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
    expect(screen.queryByText('pokemon-name')).not.toBeInTheDocument();
  });

  it('renders 2 favorites pokemons', () => {
    const { pokemons } = mockedData;
    render(
      <FavoritePokemons pokemons={ pokemons } />,
      { wrapper: MemoryRouter },
    );

    expect(screen.getAllByTestId('pokemon-name').length).toBe(pokemons.length);
  });
});
