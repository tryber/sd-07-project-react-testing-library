import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('testing the file PokemonDetails.js', () => {
  test('the page has a text "Pokemon Details"', () => {
    const { getByText } = renderWithRouter(<App />);
    const detailsButton = getByText(/More Details/i);
    fireEvent.click(detailsButton);
    const detailsTitle = getByText(/Pikachu Details/i);
    expect(detailsTitle).toBeInTheDocument();
    const summary = getByText(/Summary/i);
    expect(summary).toBeInTheDocument();
    const detailsParagraph = getByText(/This intelligent Pokémon/i);
    expect(detailsParagraph.tagName).toBe('P');
  });

  test('the page has a map section', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);
    const detailsButton = getByText(/More Details/i);
    fireEvent.click(detailsButton);
    const detailsLocation = getByText(/Game Locations of Pikachu/i);
    expect(detailsLocation).toBeInTheDocument();
    const pokemonLocation = getAllByAltText('Pikachu location');
    const numLocationPikachu = pokemonLocation.length;
    expect(pokemonLocation.length).toBe(numLocationPikachu);
    const pokemonImgLocation = getAllByAltText('Pikachu location');
    expect(pokemonImgLocation[0].src)
      .toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  test('it is possible favor a Pokemon', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    const detailsButton = getByText(/More Details/i);
    fireEvent.click(detailsButton);
    const pokemonFavor = getByText('Pokémon favoritado?');
    expect(pokemonFavor).toBeInTheDocument();
    fireEvent.click(pokemonFavor);
    const favoriteStar = getByAltText('Pikachu is marked as favorite');
    expect(favoriteStar).toBeInTheDocument();
  });
});
