import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';

describe('6. Testing the Pokemon.js file', () => {
  it('A card is rendered with the information of a certain Pokémon.', () => {
    const { getByTestId, container } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
    );
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(/Pikachu/i);
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent(/Electric/i);
    const pokemonWeight = getByTestId('pokemon-weight');
    const avrgWeight = pokemons[0].averageWeight;
    expect(pokemonWeight).toHaveTextContent(
      `Average weight: ${avrgWeight.value} ${avrgWeight.measurementUnit}`,
    );
    const pokemonImage = container.querySelector('img');
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it(`The Pokémon card indicated on the Pokédex contains a navigation
  link to view details of this Pokémon.`, () => {
    const { container } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
    );
    const pokemonDetail = container.querySelector('a');
    expect(pokemonDetail).toHaveAttribute('href', '/pokemons/25');
  });

  it(`Clicking on the Pokémon navigation link redirects the
  application to the Pokémon details page.`, () => {
    const { getByText } = renderWithRouter(<App />);
    const pokemonDetail = getByText(/More Details/i);
    expect(pokemonDetail).toHaveAttribute('href', '/pokemons/25');
    fireEvent.click(pokemonDetail);
    const detailSection = getByText(/Pikachu Details/i);
    expect(detailSection).toBeInTheDocument();
  });

  it('The URL displayed in the browser changes to / pokemon / <id>', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const pokemonDetail = getByText(/More Details/i);
    expect(pokemonDetail).toHaveAttribute('href', '/pokemons/25');
    fireEvent.click(pokemonDetail);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('There is a star icon on favorite Pokémon.', () => {
    const favorited = true;
    const { container } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ favorited } />,
    );
    const pokemonFavorited = container.querySelector('img.favorite-icon');
    expect(pokemonFavorited).toHaveAttribute('src', '/star-icon.svg');
    expect(pokemonFavorited).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
