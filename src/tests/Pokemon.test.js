import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

import Pokemon from '../components/Pokemon';

import data from '../data';

afterEach(() => {
  cleanup();
});

test('tests if a pokemon card is rendered', () => {
  const { getByTestId, getByRole } = renderWithRouter(
    <Pokemon
      pokemon={ data[0] }
      isFavorite={ false }
    />,
  );

  const name = getByTestId('pokemon-name');
  const type = getByTestId('pokemonType');
  const averageWeight = getByTestId('pokemon-weight');
  const imageContent = getByRole('img');

  expect(name).toHaveTextContent('Pikachu');
  expect(type).toHaveTextContent('Electric');
  expect(averageWeight).toHaveTextContent('Average weight: 6.0 kg');
  expect(imageContent.src).toBe(data[0].image);
  expect(imageContent.alt).toBe('Pikachu sprite');
});
