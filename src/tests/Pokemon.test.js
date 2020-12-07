import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';

const pokemons = {
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
  summary: 'This intelligent Pokémon roasts hard berries with electricity.',
};

const isFavorite = true;

test('a card is rendered with the information of a certain Pokémon', () => {
  const { getByRole, getByTestId } = renderWithRouter(
    <Pokemon pokemon={ pokemons } isFavorite={ isFavorite } />,
  );
  const name = getByTestId('pokemon-name');
  expect(name).toHaveTextContent('Pikachu');

  const type = getByTestId('pokemonType');
  expect(type).toHaveTextContent('Electric');

  const weight = getByTestId('pokemon-weight');
  expect(weight).toHaveTextContent('Average weight: 6.0 kg');

  const img = getByRole('img', {
    name: 'Pikachu sprite',
    src: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  });
  expect(img).toBeDefined();
  expect(img).toHaveAttribute(
    'src',
    'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  );
});

test('The Pokémon card contains a navigation link to display details', () => {
  const { getByText, history } = renderWithRouter(
    <Pokemon pokemon={ pokemons } isFavorite={ isFavorite } />,
  );
  fireEvent.click(getByText(/More details/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

test('there is a star icon on favorite Pokémon', () => {
  const { getByRole } = renderWithRouter(
    <Pokemon pokemon={ pokemons } isFavorite={ isFavorite } />,
  );

  const img = getByRole('img', {
    name: 'Pikachu is marked as favorite',
    src: '/star-icon.svg',
  });
  expect(img).toBeDefined();
  expect(img).toHaveAttribute(
    'src',
    '/star-icon.svg',
  );
});
