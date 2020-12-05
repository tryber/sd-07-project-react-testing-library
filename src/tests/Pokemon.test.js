import React from 'react';

import { render } from '@testing-library/react';
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
    summary:
      'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  };

  test('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByText, container } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ false } />,
    );
    const name = getByText(pokemon.name);
    const type = getByText(pokemon.type);
    const {value, measurementUnit} = pokemon.averageWeight;
    const avarageWeightText = getByText(
      `Average weight: ${value} ${measurementUnit}`,
    );
    const imgSrc = container.querySelector(`[src='${pokemon.image}']`);
    const imgAlt = container.querySelector(`[alt='${pokemon.name} sprite']`);

    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(avarageWeightText).toBeInTheDocument();
    expect(imgSrc).toBeInTheDocument();
    expect(imgAlt).toBeInTheDocument();
  });
});
