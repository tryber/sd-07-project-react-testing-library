import React from 'react';
import fireEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWhithRouter';
import { PokemonDetails } from '../components';
import data from '../data';

describe('Testing PokemonDetails.js ⌐> Checks if:', () => {
  const mockFavById = { 25: true };
  const mockMatch = { params: { id: '25' } };
  const mockById = Object.keys(mockFavById).map((key) => parseInt(key, 10));

  const mockPokemons = data.filter((pokemon) => mockById.includes(pokemon.id));
  describe('Detailed information about the pokemon is shown on screen:', () => {
    test('if there is a "<pokemonName> Details" text', () => {
      const { getByRole } = renderWithRouter(
        <PokemonDetails
          pokemons={ mockPokemons }
          match={ mockMatch }
          isPokemonFavoriteById={ mockFavById }
          // onUpdateFavoritePokemons={ (mockById, mockByValue) }
        />,
      );

      const detailTitle = getByRole('heading', {
        name: `${mockPokemons[0].name} Details` });
      expect(detailTitle).toBeInTheDocument();
    });
    test('if there isn\'t a link to detailed navegation', () => {
      const { queryByRole } = renderWithRouter(
        <PokemonDetails
          pokemons={ mockPokemons }
          match={ mockMatch }
          isPokemonFavoriteById={ mockFavById }
          // onUpdateFavoritePokemons={ (mockById, mockByValue) }
        />,
      );

      const detailLink = queryByRole('link', {
        name: 'More Details' });
      expect(detailLink).toBeNull();
    });
    test('if there is a "Summary" heading h2', () => {
      const { getByRole } = renderWithRouter(
        <PokemonDetails
          pokemons={ mockPokemons }
          match={ mockMatch }
          isPokemonFavoriteById={ mockFavById }
          // onUpdateFavoritePokemons={ (mockById, mockByValue) }
        />,
      );

      const summaryTitle = getByRole('heading', {
        name: /(Summary)/i });
      expect(summaryTitle).toBeInTheDocument();
    });
    test('if there is a paragraph with pokemon resume', () => {
      const { container } = renderWithRouter(
        <PokemonDetails
          pokemons={ mockPokemons }
          match={ mockMatch }
          isPokemonFavoriteById={ mockFavById }
          // onUpdateFavoritePokemons={ (mockById, mockByValue) }
        />,
      );

      const parResume = container.querySelectorAll('p');
      expect(parResume[3]).toBeInTheDocument();
    });
  });
  describe('Test if exist a section with maps to pokemon locations:', () => {
    test('if there is a heading h2 "Game Locations of <pokemonName>"', () => {
      const { getByRole } = renderWithRouter(
        <PokemonDetails
          pokemons={ mockPokemons }
          match={ mockMatch }
          isPokemonFavoriteById={ mockFavById }
          // onUpdateFavoritePokemons={ (mockById, mockByValue) }
        />,
      );

      const detailTitle = getByRole('heading', {
        name: `Game Locations of ${mockPokemons[0].name}` });
      expect(detailTitle).toBeInTheDocument();
    });
    test('if all pokemon lications are shown', () => {
      const { container } = renderWithRouter(
        <PokemonDetails
          pokemons={ mockPokemons }
          match={ mockMatch }
          isPokemonFavoriteById={ mockFavById }
          // onUpdateFavoritePokemons={ (mockById, mockByValue) }
        />,
      );

      const locations = mockPokemons[0].foundAt.length;

      const locationName = container.querySelectorAll('em');
      expect(locationName).toHaveLength(locations);
    });
    test('if besides the map locations, there are location names', () => {
      const { container, getAllByRole} = renderWithRouter(
        <PokemonDetails
          pokemons={ mockPokemons }
          match={ mockMatch }
          isPokemonFavoriteById={ mockFavById }
          // onUpdateFavoritePokemons={ (mockById, mockByValue) }
        />,
      );

      const locations = mockPokemons[0].foundAt.length;

      const locationName = container.querySelectorAll('em');
      expect(locationName).toHaveLength(locations);
      const locationImg = getAllByRole('img',
        { name: `${mockPokemons[0].name} location` });
      expect(locationImg).toHaveLength(locations);
    });
    test('if there is a URL path to each map location', () => {
      const { container, getAllByRole} = renderWithRouter(
        <PokemonDetails
          pokemons={ mockPokemons }
          match={ mockMatch }
          isPokemonFavoriteById={ mockFavById }
          // onUpdateFavoritePokemons={ (mockById, mockByValue) }
        />,
      );

      const locations = mockPokemons[0].foundAt.length;

      const locationName = container.querySelectorAll('em');
      expect(locationName).toHaveLength(locations);
      const locationImg = getAllByRole('img',
        { name: `${mockPokemons[0].name} location` });
      mockPokemons[0].foundAt.forEach((element, index) => {
        expect(locationImg[index].src).toBe(element.map);
      });
    });
    test('if there is a ALT with "<pokemonName location"', () => {
      const { container, getAllByRole} = renderWithRouter(
        <PokemonDetails
          pokemons={ mockPokemons }
          match={ mockMatch }
          isPokemonFavoriteById={ mockFavById }
          // onUpdateFavoritePokemons={ (mockById, mockByValue) }
        />,
      );

      const locations = mockPokemons[0].foundAt.length;

      const locationName = container.querySelectorAll('em');
      expect(locationName).toHaveLength(locations);
      const locationImg = getAllByRole('img',
        { name: `${mockPokemons[0].name} location` });
      mockPokemons[0].foundAt.forEach((element, index) => {
        expect(locationImg[index].alt).toBe(`${mockPokemons[0].name} location`);
      });
    });
  });
  describe('Test if the user can favorite a pokemon through the details page:', () => {
    test('if there is a "checkbox" to favorite the pokemon', () => {});
    test('if alternated clicks on "checkbox" add or remove favorite from list', () => {});
    test('if the "checkbox label" contains the text "Pokémon favoritado?"', () => {});
  });
});
