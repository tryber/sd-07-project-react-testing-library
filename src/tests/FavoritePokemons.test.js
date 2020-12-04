import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Pokemons not found message', () => {
  it('should render an message on screen with text `No favorite pokemon found`', () => {
    const favoritePokemons = [];
    const { getByText } = renderWithRouter(
      <FavoritePokemons
        pokemons={ favoritePokemons }
      />,
    );
    const favoritePokemonNotFound = getByText(/No favorite pokemon found/i);
    expect(favoritePokemonNotFound).toBeInTheDocument();
  });
});

describe('The cards of Fav Pokemons are displayed correctly', () => {
  it('should correctly render 5 of this favorites pokemon cards', () => {
    const favoritePokemons = [
      pokemons[3],
      pokemons[4],
      pokemons[5],
      pokemons[6],
      pokemons[8],
    ];
    const { getByText } = renderWithRouter(
      <FavoritePokemons
        pokemons={ favoritePokemons }
      />,
    );

    favoritePokemons.forEach((pokemon) => {
      const pokemonInPage = getByText(`${pokemon.name}`);
      expect(pokemonInPage).toBeInTheDocument();
    });
  });
});

describe('if not favorited not rendered', () => {
  it('it shouldnt render 4 of this non favorites pokemon cards', () => {
    const favoritePokemons = [
      pokemons[3],
      pokemons[4],
      pokemons[5],
      pokemons[6],
      pokemons[8],
    ];
    const notFavoritePokemons = [pokemons[0], pokemons[1], pokemons[2], pokemons[7]];
    const { queryByText } = renderWithRouter(
      <FavoritePokemons
        pokemons={ favoritePokemons }
      />,
    );

    notFavoritePokemons.forEach((pokemon) => {
      const pokemonInPage = queryByText(`${pokemon.name}`);
      expect(pokemonInPage).not.toBeInTheDocument();
    });
  });
});
