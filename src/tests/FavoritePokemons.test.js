import React from 'react';

import { render } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
// import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('3. FavoritePokemons.js file', () => {
  test('if theres no favorite pokemon whould be displayed *no favorite pokemon*', () => {
    const EMPY_ARR = [];
    const { getByText } = render(<FavoritePokemons pokemons={ EMPY_ARR } />);

    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  test('test if fav pokemons are displayed', () => {
    const favoritePokemons = [
      {
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
      },
    ];
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ favoritePokemons } />,
    );

    favoritePokemons.map(({ name }) => expect(getByText(name)).toBeInTheDocument());
  });
  test('test if fav pokemons are displayed with no fav pokemons', () => {
    const favoritePokemons = [];
    const ZERO = 0;
    const { queryAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ favoritePokemons } />,
    );
    expect(queryAllByTestId('pokemonType').length).toBe(ZERO);
  });
});
