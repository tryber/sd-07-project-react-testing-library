import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import pokemonMock from '../mocks/mockFavoritePokemons';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';

afterEach(cleanup);

const { pokemons } = pokemonMock;
const pokemon = pokemons[0];

const isFavorite = true;

describe('testing the file Pokemon.js', () => {
  test('the page has a card with a Pokemon information', () => {
    const { getByText, getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemon } />,
    );
    const pokemonName = getByText(/Snorlax/i);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName.innerHTML).toBe('Snorlax');

    const pokemonType = getByText(/Normal/i);
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType.innerHTML).toBe('Normal');

    const pokemonWeightValue = getByText(/460.0/i);
    expect(pokemonWeightValue).toBeInTheDocument();
    expect(pokemonWeightValue.innerHTML).toBe('Average weight: 460.0 kg');

    const pokemonWeightUnit = getByText(/kg/i);
    expect(pokemonWeightUnit).toBeInTheDocument();
    expect(pokemonWeightUnit.innerHTML).toBe('Average weight: 460.0 kg');

    const image = getByAltText('Snorlax sprite');
    expect(image).toBeInTheDocument();
    expect(image.alt).toBe(`${pokemon.name} sprite`);
    expect(image.src).toBe(`${pokemon.image}`);
  });

  test('the Pokemon card has a link to the details', () => {
    const { getByText } = renderWithRouter(
      <Pokemon pokemon={ pokemon } />,
    );
    const detailsLink = getByText(/More details/i);
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink.href)
      .toBe(`http://localhost/pokemons/${pokemon.id}`);
  });

  test('there is a star icon to the favorite Pokemons', () => {
    const { getByText, history, getAllByRole } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isFavorite }
      />,
    );
    const detailsLink = getByText(/More details/i);
    fireEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemon.id}`);
    const image = getAllByRole('img');
    expect(image[1].src).toBe('http://localhost/star-icon.svg');
    expect(image[1].alt).toBe(`${pokemon.name} is marked as favorite`);
  });
});
