import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

const mockedTrue = [
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
        map:
          'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary:
      'This intelligent Pokémon ... to eat.',
  },
];

const mockedFalse = [];

test('No favorite pokemon found appears on the screen, not have favorite pokemon', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const mensage = getByText(/No favorite pokemon found/i);

  expect(mensage).toBeInTheDocument();
});

test('displayed all favorite Pokémon cards.', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ mockedTrue } />);
  const pokemonMocked = getByText(/Pikachu/i);

  expect(pokemonMocked).toBeInTheDocument();
});

test('no pokemon card is displayed, if it is not favored.', () => {
  const { container } = renderWithRouter(<FavoritePokemons pokemons={ mockedFalse } />);
  const [p] = container.getElementsByTagName('p');

  expect(p).toBeInTheDocument();
  expect(p).toHaveTextContent(/No favorite Pokemon Found/i);
});
