import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';

const pokemonData = {
  name: 'pikachu',
  type: 'Electric',
  image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  averageWeight: { measurementUnit: 'kg', value: '8.5' },
  id: 25,
};

const favorite = true;

afterEach(cleanup);

// prettier-ignore
test('if a single pokemon card is displayed', () => {
  const { getByText, getByAltText } = render(
    <MemoryRouter>
      <Pokemon pokemon={ pokemonData } isFavorite={ favorite } />
    </MemoryRouter>,
  );

  const namePokemon = getByText(/Pikachu/i);
  const typePokemon = getByText(/Electric/i);
  const weight = getByText(/Average weight: [0-9.]+ kg/i);
  const altText = getByAltText('pikachu sprite');

  expect(namePokemon).toBeInTheDocument();
  expect(typePokemon).toBeInTheDocument();
  expect(weight).toBeInTheDocument();
  expect(altText).toBeInTheDocument();
  expect(altText).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

// prettier-ignore
test('if the details link is displayed with the right URL', () => {
  const { getByText, history } = renderWithRouter(
    <Pokemon pokemon={ pokemonData } isFavorite={ favorite } />,
  );

  const detailsBtn = getByText(/More Details/i);
  expect(detailsBtn).toBeInTheDocument();

  fireEvent.click(detailsBtn);
  const { pathname } = history.location;

  expect(pathname).toBe('/pokemons/25');

//   const textDetails = getByText('Pikachu Details');
//   expect(textDetails).toBeInTheDocument();
});

// prettier-ignore
test('if there is a star icon on the favorites pokemons', () => {
  const { getByAltText } = renderWithRouter(
    <Pokemon pokemon={ pokemonData } isFavorite={ favorite } />,
  );

  const altText = getByAltText(/Pikachu is marked as favorite/i);
  expect(altText).toBeInTheDocument();

  expect(altText).toHaveAttribute('src', '/star-icon.svg');
});
