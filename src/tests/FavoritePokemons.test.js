import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('3. Testing the FavoritePokemons.js file', () => {
  it(`The message No favorite pokemon found is displayed on the screen,
  if the person does not have favorite pokemon.`, () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavorite = getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });

  it('All favorite Pokémon cards are displayed', () => {
    const favorites = [pokemons[0], pokemons[1], pokemons[2]];
    const { container } = renderWithRouter(<FavoritePokemons pokemons={ favorites } />);
    const displayedFavorites = container.querySelectorAll('div.favorite-pokemon');
    const favoritesLength = 3;
    expect(displayedFavorites.length).toBe(favoritesLength);
  });

  it('No Pokémon card is displayed if it is not favored', () => {
    const favorites = [pokemons[0], pokemons[1], pokemons[2]];
    const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={ favorites } />);
    const noFavorite1 = queryByText(/Ekans/i);
    expect(noFavorite1).not.toBeInTheDocument();
    const noFavorite2 = queryByText(/Snorlax/i);
    expect(noFavorite2).not.toBeInTheDocument();
  });
});
