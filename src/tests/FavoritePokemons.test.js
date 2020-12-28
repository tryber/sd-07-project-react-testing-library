import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testing Favorite Pokémon page', () => {
  it('displays "No favorite pokemon found" when favorite list is empty', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavoriteMessage = getByText(/No favorite pokemon found/i);
    expect(noFavoriteMessage).toBeInTheDocument();
  });
  it('favorite cards are rendered correctly', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    fireEvent.click(getByText(/More details/i));
    fireEvent.click(getByText(/Pokémon favoritado/i));
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const favoritedPokemon = getByTestId(/pokemon-name/i);
    expect(favoritedPokemon).toBeInTheDocument();
  });
});
