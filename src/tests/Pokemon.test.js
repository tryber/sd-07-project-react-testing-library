import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouters from '../renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('If pokemon Card is rendered correctly', () => {
  const pokemonMock = pokemons[0];
  test('If pokemon name is correct', () => {
    const { name } = pokemonMock;
    const { getByText } = renderWithRouters(
      <Pokemon
        pokemon={ pokemonMock }
        isFavorite
      />,
    );
    expect(getByText(name)).toBeInTheDocument();
  });

  test('If pokemon type is correct', () => {
    const { type } = pokemonMock;
    const { getByText } = renderWithRouters(
      <Pokemon
        pokemon={ pokemonMock }
        isFavorite
      />,
    );
    expect(getByText(type)).toBeInTheDocument();
  });

  test('If pokemon average weight is correct', () => {
    const { value, measurementUnit } = pokemonMock.averageWeight;
    const { getByText } = renderWithRouters(
      <Pokemon
        pokemon={ pokemonMock }
        isFavorite
      />,
    );
    expect(getByText(`Average weight: ${value} ${measurementUnit}`)).toBeInTheDocument();
  });

  test('If image is uploades correctly', () => {
    const { name } = pokemonMock;
    const { image } = pokemonMock;
    const { getByRole } = renderWithRouters(
      <Pokemon
        pokemon={ pokemonMock }
        isFavorite
      />,
    );
    expect(getByRole('img', { name: `${name} sprite` }).src).toBe(image);
    expect(getByRole('img', { name: `${name} sprite` }).alt).toBe(`${name} sprite`);
  });
});

test('If pokemon Card have a navegation Link', () => {
  const pokemonMock = pokemons[0];
  const { id } = pokemonMock;
  const { getByRole } = renderWithRouters(
    <Pokemon
      pokemon={ pokemonMock }
      isFavorite
    />,
  );
  expect(getByRole('link').href).toBe(`http://localhost/pokemons/${id}`);
});

test('If More Details button redirect to pokemon details page', () => {
  const pokemonMock = pokemons[0];
  const { name } = pokemonMock;
  const { getByText } = renderWithRouters(<App />);
  const button = getByText('More details');
  fireEvent.click(button);
  expect(getByText(`${name} Details`)).toBeInTheDocument();
});

test('If URL is according details page', () => {
  const pokemonMock = pokemons[0];
  const { id } = pokemonMock;
  const { getByText, history } = renderWithRouters(<App />);
  const button = getByText('More details');
  fireEvent.click(button);
  expect(history.location.pathname).toMatch(`/pokemons/${id}`);
});

describe('Test star image of favorites pokemons', () => {
  test('If favorite pokemon have a star image', () => {
    const pokemonMock = pokemons[0];
    const { name } = pokemonMock;
    const { getByRole } = renderWithRouters(
      <Pokemon
        pokemon={ pokemonMock }
        isFavorite
      />,
    );
    expect(getByRole('img', { name: `${name} is marked as favorite` }).src)
      .toMatch('/star-icon.svg');
  });

  test('If star image have alt atribute', () => {
    const pokemonMock = pokemons[0];
    const { name } = pokemonMock;
    const { getByRole } = renderWithRouters(
      <Pokemon
        pokemon={ pokemonMock }
        isFavorite
      />,
    );
    expect(getByRole('img', { name: `${name} is marked as favorite` }).alt)
      .toBe(`${name} is marked as favorite`);
  });
});
