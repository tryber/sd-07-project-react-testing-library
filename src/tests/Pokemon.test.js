import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemonArray from '../data';

describe('if a card is rendered with the information of a certain Pokémon.', () => {
  it('should be shown on the screen the correct name of the Pokémon ', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonArray[0] }
        isFavorite
      />,
    );
    const { name } = pokemonArray[0];
    const pokeName = getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent(name);
  });

  it('should be shown on the screen the correct type of the Pokémon ', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonArray[0] }
        isFavorite
      />,
    );
    const { type } = pokemonArray[0];
    const pokeType = getByTestId('pokemonType');
    expect(pokeType).toHaveTextContent(type);
  });

  it('should be shown on the screen Average `weight: value measurementUnit`', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonArray[0] }
        isFavorite
      />,
    );
    const { averageWeight: { value, measurementUnit } } = pokemonArray[0];
    const pokeWeight = getByTestId('pokemon-weight');
    expect(pokeWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
  });

  it('should be shown on the screen the correct name of the Pokémon ', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonArray[0] }
        isFavorite
      />,
    );
    const { name, image } = pokemonArray[0];
    const pokeImage = getByAltText(`${name} sprite`);
    expect(pokeImage.src).toBe(`${image}`);
  });
});

describe('Contains a navigation link to view details', () => {
  it('must have a link with text `More details`', () => {
    const { getByText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonArray[0] }
        isFavorite
      />,
    );
    const moredetails = getByText('More details');
    expect(moredetails).toBeInTheDocument();
  });

  it('must have a link with URL `/pokemons/<id>`', () => {
    const { getByText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonArray[0] }
        isFavorite
      />,
    );
    const moredetails = getByText('More details');
    const { id } = pokemonArray[0];
    expect(moredetails.pathname).toBe(`/pokemons/${id}`);
  });
  it('must have a link with URL for different ids `/pokemons/<id>`', () => {
    const { getByText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonArray[1] }
        isFavorite
      />,
    );
    const moredetails = getByText('More details');
    const { id } = pokemonArray[1];
    expect(moredetails.pathname).toBe(`/pokemons/${id}`);
  });
});

describe('Redirect To details', () => {
  test('if clicking on the Pokémon navigation link redirects to details page', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonArray[0] }
        isFavorite
      />,
    );
    let { pathname } = history.location;
    expect(pathname).toBe('/');

    const { id } = pokemonArray[0];
    const moredetails = getByText('More details');
    fireEvent.click(moredetails);
    pathname = history.location.pathname;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  test('if clicking on the Pokémon navigation link redirects to correct url', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonArray[0] }
        isFavorite
      />,
    );
    let { pathname } = history.location;
    expect(pathname).toBe('/');

    const { id } = pokemonArray[0];
    const moredetails = getByText('More details');
    fireEvent.click(moredetails);
    pathname = history.location.pathname;
    expect(pathname).toBe(`/pokemons/${id}`);
  });
});

describe('Favorite Star', () => {
  it('should render a star icon for favorite pokemons', () => {
    const { container } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonArray[0] }
        isFavorite
      />,
    );
    const favoriteIcon = container.querySelector('.favorite-icon');
    expect(favoriteIcon).toBeInTheDocument();
  });

  it('shouldnt render a star icon for non favorite pokemons', () => {
    const { container } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonArray[0] }
        isFavorite={ false }
      />,
    );
    const favoriteIcon = container.querySelector('.favorite-icon');
    expect(favoriteIcon).not.toBeInTheDocument();
  });

  it('should have alt Text of `name-of-pokemon is marked as favorite` ', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonArray[0] }
        isFavorite
      />,
    );
    const { name } = pokemonArray[0];
    const favoriteIcon = getByAltText(`${name} is marked as favorite`);
    expect(favoriteIcon).toBeInTheDocument();
  });

  it('should have src path of `/star-icon.svg` ', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonArray[0] }
        isFavorite
      />,
    );
    const { name } = pokemonArray[0];
    const favoriteIcon = getByAltText(`${name} is marked as favorite`);
    expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
