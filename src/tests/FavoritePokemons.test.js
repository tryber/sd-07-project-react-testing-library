import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testing Favorite Pokemons page', () => {
  test('message "No favorite pokemon found" is in the page', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const message = getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });

  test('all favorite cards is in the page', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/i));
    fireEvent.click(getByText(/Pokémon favoritado/i));
    fireEvent.click(getByText(/Favorite pokémons/i)); // botão menu

    const favoritePokemon = getByTestId(/pokemon-name/i);
    expect(favoritePokemon).toBeInTheDocument();
  });
});
