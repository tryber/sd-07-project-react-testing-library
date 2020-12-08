import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';
import { Pokemon } from '../components';

afterEach(cleanup);

describe('Testing the file Pokemon.js', () => {
  test('rendered a card with the information', () => {
    const poke = pokemons[0];
    const { getByText, queryByAltText } = renderWithRouter(
      <Pokemon pokemon={ poke } isFavorite={ false } />,
    );
    const name = getByText(poke.name);
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(/Pikachu/i);
    const type = getByText(poke.type);
    expect(type).toBeInTheDocument();
    expect(type).toHaveTextContent(/Electric/i);
    const pokeWeight = getByText(
      `Average weight: ${poke.averageWeight.value} ${poke.averageWeight.measurementUnit}`,
    );
    expect(pokeWeight).toBeInTheDocument();
    const img = queryByAltText(`${poke.name} sprite`);
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(poke.image);
  });

  test('contains a navigation link to view details of this Pokémon', () => {
    const poke = pokemons[0];
    const { queryByText, history } = renderWithRouter(
      <Pokemon pokemon={ poke } isFavorite={ false } />,
    );
    const btLink = queryByText('More details');
    fireEvent.click(btLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('there is a star icon on favorite Pokémo', () => {
    const poke = pokemons[0];
    const { getByAltText } = renderWithRouter(<Pokemon pokemon={ poke } isFavorite />);
    const txtImage = getByAltText('Pikachu is marked as favorite');
    expect(txtImage).toBeInTheDocument();
    expect(txtImage).toHaveAttribute('src', '/star-icon.svg');
  });
});
