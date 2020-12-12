// import React from 'react';
import { fireEvent, waitForDomChange } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
// import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('test if it renders a card with detailed info about selected pokemon.', () => {
  test('render correct name of pokemon', () => {
    const pokemon = pokemons[0];
    const { getByTestId } = renderWithRouter(
      Pokemon({ pokemon, showDetailsLink: true, isFavorite: true }),
    );
    const name = getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(pokemon.name);
  });
  test('render correct type of pokemon', () => {
    const pokemon = pokemons[0];
    const { getByTestId } = renderWithRouter(
      Pokemon({ pokemon, showDetailsLink: true, isFavorite: true }),
    );
    const type = getByTestId('pokemonType');
    expect(type).toBeInTheDocument();
    expect(type).toHaveTextContent(pokemon.type);
  });
  test('render correct average weight of pokemon', () => {
    const pokemon = pokemons[0];
    const { getByTestId } = renderWithRouter(
      Pokemon({ pokemon, showDetailsLink: true, isFavorite: true }),
    );
    const averageWeight = getByTestId('pokemon-weight');
    const { value: weight, measurementUnit } = pokemon.averageWeight;
    expect(averageWeight).toBeInTheDocument();
    expect(averageWeight).toHaveTextContent(
      `Average weight: ${weight} ${measurementUnit}`,
    );
  });
});

describe('test integration links in the cards', () => {
  test('if card in the pokedex page have a link to details about the pokemon.', () => {
    const pokemon = pokemons[0];
    const { queryByText } = renderWithRouter(
      Pokemon({ pokemon, showDetailsLink: true, isFavorite: true }),
    );
    const detailsLink = queryByText(/More details/i);
    expect(detailsLink).not.toBe(null);
    expect(detailsLink).toHaveAttribute('href', `/pokemons/${pokemon.id}`);
  });
  test('if link redirects to the details page.', () => {
    const pokemon = pokemons[0];
    const { queryByText, history } = renderWithRouter(
      Pokemon({ pokemon, showDetailsLink: true, isFavorite: true }),
    );
    const detailsLink = queryByText(/More details/i);
    fireEvent.click(detailsLink);
    waitForDomChange();
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemon.id}`);
  });
  test('if renders pokemon image.', () => {
    const pokemon = pokemons[0];
    const { queryByAltText } = renderWithRouter(
      Pokemon({ pokemon, showDetailsLink: true, isFavorite: true }),
    );
    const pokemonImage = queryByAltText(`${pokemon.name} sprite`);
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src', `${pokemon.image}`);
  });
  test('if favorited pokemons have a star.', () => {
    const pokemon = pokemons[0];
    const { queryByAltText } = renderWithRouter(
      Pokemon({ pokemon, showDetailsLink: true, isFavorite: true }),
    );
    const starImage = queryByAltText(/is marked as favorite/i);
    expect(starImage).toBeInTheDocument();
    expect(starImage).toHaveAttribute('src', '/star-icon.svg');
    expect(starImage).toHaveAttribute('alt', `${pokemon.name} is marked as favorite`);
  });
});
