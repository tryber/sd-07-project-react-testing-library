import React from 'react';
import { fireEvent } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Tests the elements of the FavoritePokemons.js component', () => {
  it('test the message `No favorite pokemon found`', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFound = getByText(/No favorite pokemon found/);
    expect(notFound).toBeInTheDocument();
  });

  it('test whether all favorite Pokémon cards are displayed', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const moreDetailsLink = getByText(/More details/);
    fireEvent.click(moreDetailsLink);
    const checkbox = getByRole('checkbox', { name: /Pokémon favoritado?/i });
    fireEvent.click(checkbox);

    const pathFavorite = getByText(/Favorite Pokémons/);
    fireEvent.click(pathFavorite);

    const pokemonName = getByText('Pikachu');
    const type = getByText(/Electric/);
    expect(pokemonName).toBeInTheDocument();
    expect(type).toBeInTheDocument();
  });

  it('Tests if no Pokémon card is displayed, if it is not favored', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons />);
    const charmander = queryByText(/Charmander/);
    expect(charmander).not.toBeInTheDocument();
  });
});
