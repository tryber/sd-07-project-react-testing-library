import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

test('page should render a card with info on specific pokemon', () => {
  const pikachu = pokemons[0];
  const { getByTestId, getByRole, getByAltText } = renderWithRouter(
    <Pokemon pokemon={ pikachu } isFavorite={ false } />,
  );
  const pokemonName = getByTestId('pokemon-name');
  const pokemonType = getByTestId('pokemonType');
  const pokemonWeight = getByTestId('pokemon-weight');
  const { value, measurementUnit } = pikachu.averageWeight;
  const src = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
  expect(pokemonName).toBeInTheDocument();
  expect(pokemonName.textContent).toBe(pikachu.name);
  expect(pokemonType).toBeInTheDocument();
  expect(pokemonType.textContent).toBe(pikachu.type);
  expect(pokemonWeight).toBeInTheDocument();
  expect(pokemonWeight.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);
  expect(getByRole('img').src).toBe(src);
  expect(getByAltText('Pikachu sprite')).toBeInTheDocument();
});
test('page should have navigation link to pokemon details', () => {
  const pikachu = pokemons[0];
  const { getByText } = renderWithRouter(
    <Pokemon pokemon={ pikachu } isFavorite={ false } />,
  );
  const link = getByText(/More details/i);
  expect(link).toBeInTheDocument();
  expect(link.tagName.toLowerCase()).toBe('a');
  expect(link).toHaveAttribute('href', `/pokemons/${pikachu.id}`);
});

test('navigation link should redirect to pokemon details page', () => {
  const pikachu = pokemons[0];
  const { getByText, history } = renderWithRouter(
    <Pokemon pokemon={ pikachu } isFavorite={ false } />,
  );
  const link = getByText(/More details/i);
  fireEvent.click(link);
  const { pathname } = history.location;
  expect(pathname).toBe(`/pokemons/${pikachu.id}`);
});
test('page must contains star icon if pokemon is favorited', () => {
  const pikachu = pokemons[0];
  const { getByAltText } = renderWithRouter(
    <Pokemon pokemon={ pikachu } isFavorite />,
  );
  const star = getByAltText(`${pikachu.name} is marked as favorite`);
  expect(star).toBeInTheDocument();
  expect(star).toHaveAttribute('src', '/star-icon.svg');
});
