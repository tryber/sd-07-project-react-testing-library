import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('testing pokemon', () => {
  test('render a pokemon card', () => {
    const { getByTestId, getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
    );

    expect(getByTestId('pokemon-name')).toHaveTextContent(
      `${pokemons[0].name}`,
    );
    expect(getByTestId('pokemonType')).toHaveTextContent(pokemons[0].type);
    expect(getByTestId('pokemon-weight')).toHaveTextContent(
      `Average weight: ${pokemons[0].averageWeight.value} ${pokemons[0].averageWeight.measurementUnit}`,
    );

    const pokemonsImage = getByAltText(`${pokemons[0].name} sprite`);
    expect(pokemonsImage.src).toBe(`${pokemons[0].image}`);
  });

  test('more details link', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
    );

    const moreDetailsLink = getByText('More details');
    expect(moreDetailsLink).toBeInTheDocument();
    fireEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  test('star favorite icon', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ true } />,
    );

    const star = getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
