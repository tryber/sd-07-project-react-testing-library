import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import App from '../App';

describe('testing file Pokemon.js', () => {
  afterEach(cleanup);
  const pokemonToBeTested = pokemons[0];

  it('the card with the information of a certain Pokémon is rendered correctly', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemonToBeTested }
      showDetailsLink
      isFavorite
    />);
    const correctName = getByTestId('pokemon-name');
    const correctType = getByTestId('pokemonType');
    const correctAverageWeight = getByTestId('pokemon-weight');
    const correctPokemonImage = getByAltText(/Pikachu sprite/i);
    const correctFavoriteImage = getByAltText(/Pikachu is marked as favorite/i);
    expect(correctName).toHaveTextContent('Pikachu');
    expect(correctType).toHaveTextContent('Electric');
    expect(correctAverageWeight).toHaveTextContent('6.0 kg');
    expect(correctPokemonImage).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(correctFavoriteImage).toHaveAttribute('src', '/star-icon.svg');
  });

  it('Pokémon card contains a link to view details of this Pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const twentyFive = 25;
    const pokemonId = pokemons[0].id;
    expect(pokemonId).toBe(twentyFive);
    const moreDetails = getByText(/More details/i);
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
  });

  it('clicking on Pokémon redirects application to the Pokémon details page', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const twentyFive = 25;
    const pokemonId = pokemons[0].id;
    expect(pokemonId).toBe(twentyFive);
    const pokemonName = getByText(/Pikachu/i);
    expect(pokemonName).toBeVisible();
    const moreDetails = getByText(/More details/i);
    fireEvent.click(moreDetails);
    const headingPikachu = getByRole('heading', { name: 'Pikachu Details' });
    expect(headingPikachu.tagName).toBe('H2');
  });

  it('the URL displayed in the browser changes to "/pokemons/<id>"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const twentyFive = 25;
    const pokemonId = pokemons[0].id;
    expect(pokemonId).toBe(twentyFive);
    const pokemonName = getByText(/Pikachu/i);
    const moreDetails = getByText(/More details/i);
    fireEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pokemonName).toBeVisible();
    expect(pathname).toBe('/pokemons/25');
  });

  it('the star icon is displayed on favorite Pokémons', () => {
    const { getByText, getByRole, getByAltText } = renderWithRouter(<App />);
    const pokemonName = getByText(/Pikachu/i);
    expect(pokemonName).toBeVisible();
    const moreDetailsPikachu = getByText(/More details/i);
    fireEvent.click(moreDetailsPikachu);
    const favoritePikachu = getByRole('checkbox');
    fireEvent.click(favoritePikachu);
    expect(favoritePikachu.checked).toBe(true);
    const image = getByAltText(/Pikachu is marked as favorite/i);
    expect(image).toHaveClass('favorite-icon');
  });
});
