import React from 'react';
import RenderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import data from '../data';

describe('Testing the FavoritePokemons.js file', () => {
  const poke = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'This intelligent Pokémon roasts hard berries.',
  };
  it('if the message `No favorite pokemon found` is displayed', () => {
    const { getByText } = RenderWithRouter(
      <FavoritePokemons
        pokemon={ poke }
      />,
    );
    const text = getByText(/No favorite pokemon found/);
    expect(text).toBeInTheDocument();
  });
  it('Test whether all favorite Pokémon cards are displayed', () => {
    const favorite = ['Pikachu', 'Dragonair'];
    const favoriteExpec = data.filter((pokemon) => favorite.includes(pokemon.name));
    const favoriteExpecLength = 2;
    expect(favoriteExpec.length).toBe(favoriteExpecLength);
  });
  it('Test if ** no ** Pokémon card is displayed, if it is not favored', () => {
    const favoritePokemons = [];
    const { queryByText } = RenderWithRouter(
      <FavoritePokemons pokemons={ favoritePokemons } />,
    );
    const caterpie = queryByText('Caterpie');
    expect(caterpie).toBeNull();
  });
});
