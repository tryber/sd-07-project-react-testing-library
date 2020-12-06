import React from 'react';

import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';

describe('6. Testando o arquivo Pokemon.js', () => {
  const pokemon = {
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
  };

  test('Render car with some pokemon info', () => {
    const { getByText, container } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ false } />,
    );
    const name = getByText(pokemon.name);
    const type = getByText(pokemon.type);
    const { value, measurementUnit } = pokemon.averageWeight;
    const avarageWeightText = getByText(`Average weight: ${value} ${measurementUnit}`);
    const imgSrc = container.querySelector(`[src='${pokemon.image}']`);
    const imgAlt = container.querySelector(`[alt='${pokemon.name} sprite']`);

    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(avarageWeightText).toBeInTheDocument();
    expect(imgSrc).toBeInTheDocument();
    expect(imgAlt).toBeInTheDocument();
  });

  test('navitagion link to details', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ false } />,
    );
    const link = getByText('More details');
    expect(link).toBeInTheDocument();

    fireEvent.click(link);
    const { pathname } = history.location;

    expect(pathname).toBe(`/pokemons/${pokemon.id}`);
  });

  test('star icon src and alt', () => {
    const { container } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ !false } />,
    );
    const favSrc = container.querySelector('[src="/star-icon.svg"]');
    const favAlt = container.querySelector(
      `[alt='${pokemon.name} is marked as favorite']`,
    );

    expect(favSrc).toBeInTheDocument();
    expect(favAlt).toBeInTheDocument();
  });
});
