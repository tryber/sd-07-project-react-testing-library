import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('', () => {
  it('check if the text `No favorite pokémon found` if no pokémon was favored', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/favorites');
    const favoritePokemons = getByText(/No favorite pokemon found/);
    expect(favoritePokemons).toBeInTheDocument();
  });

  it('check if no pokémon is shown in `Favorite Pokémons` if no pokémon was favored', () => {
    const { getByText, queryAllByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/favorites');
    const noFavoritePokemons = queryAllByText(/Average/i);
    expect(noFavoritePokemons).toHaveLength(0);
  });

  it('check if favored pokémons are shown in `Favorite Pokémons`', () => {
    const { getByText, getByRole, queryAllByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Próximo pokémon/i));
    fireEvent.click(getByText(/Próximo pokémon/i));
    fireEvent.click(getByText(/More details/i));
    fireEvent.click(getByRole('checkbox'));
    fireEvent.click(getByText(/Home/i));
    fireEvent.click(getByText(/Próximo pokémon/i));
    fireEvent.click(getByText(/More details/i));
    fireEvent.click(getByRole('checkbox'));
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/favorites');
    const firstFavoritePokemon = getByText(/Caterpie/);
    expect(firstFavoritePokemon).toBeInTheDocument();
    const secondFavoritePokemon = getByText(/Charmander/);
    expect(secondFavoritePokemon).toBeInTheDocument();
  });
});
