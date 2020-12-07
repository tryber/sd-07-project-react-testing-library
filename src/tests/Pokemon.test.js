import React from 'react';
import { screen, fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('Testing Pokemon.js file', () => {
  const randomNumber = Math.floor(Math.random() * (pokemons.length));
  const randomPokemon = pokemons[randomNumber];
  const { id, name, type, averageWeight, image } = randomPokemon;
  const { value, measurementUnit } = averageWeight;

  afterAll(cleanup);

  test('renders a Pokemon card, containing its informations', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[randomNumber] }
        isFavorite
      />,
    );

    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(screen.getByTestId('pokemonType')).toHaveTextContent(type);
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );
    expect(screen.getByAltText(`${name} sprite`)).toHaveAttribute('src', `${image}`);
  });

  test('Pokemon`s card contains a `More details` link', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[randomNumber] }
        isFavorite
      />,
    );

    expect(screen.getByText('More details')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', `/pokemons/${id}`);
  });

  test('when `More details` link is clicked, redirects to route `/pokemons/id`', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[randomNumber] }
        isFavorite
      />,
    );

    fireEvent.click(screen.getByText('More details'));
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  test('shows a star when the Pokemon is favorite', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[randomNumber] }
        isFavorite
      />,
    );

    expect(screen.getByAltText(`${name} is marked as favorite`))
      .toHaveAttribute('src', '/star-icon.svg');
  });
});
