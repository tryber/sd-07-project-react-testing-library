import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
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

test('tests if there is a link to details', () => {
  const { getByText, history } = renderWithRouter(
    <Pokemon
      pokemon={ data[0] }
      isFavorite={ false }
    />,
  );

  const linkContent = getByText('More details');

  expect(linkContent).toBeInTheDocument();
  expect(linkContent.href).toBe('http://localhost/pokemons/25');

  fireEvent.click(linkContent);
  const pathToDetails = history.location.pathname;
  expect(pathToDetails).toBe('/pokemons/25');
});

test('tests if a star icon exists', () => {
  const { container } = renderWithRouter(
    <Pokemon
      pokemon={ data[0] }
      isFavorite="true"
    />,
  );

  const starIcon = container.querySelectorAll('.favorite-icon');

  expect(starIcon[0]).toBeInTheDocument();
  expect(starIcon[0].src).toBe('http://localhost/star-icon.svg');
  expect(starIcon[0].alt).toBe('Pikachu is marked as favorite');
});
