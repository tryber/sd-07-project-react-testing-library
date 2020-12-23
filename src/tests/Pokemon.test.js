import React from 'react';
import fireEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWhithRouter';
import { Pokemon } from '../components';
import data from '../data';

describe('Testing Pokemons.js ⌐> Checks if:', () => {
  describe('Test if a PokemonCard is rendered with the informations:', () => {
    test('Pokemon name shown on screen', () => {
      const mockFavById = { 25: true };
      const mockById = Object.keys(mockFavById).map((key) => parseInt(key, 10));
      const mockPokemons = data.filter((pokemon) => mockById.includes(pokemon.id));
      const { getByTestId, getByText } = renderWithRouter(
        <Pokemon pokemon={ mockPokemons[0] } isFavorite={ mockFavById[mockById] } />,
      );

      const nameString = getByText(mockPokemons[0].name);
      expect(nameString).toBeInTheDocument();
      const nameTestId = getByTestId(/(pokemon-name)/i);
      expect(nameTestId).toBeInTheDocument();
    });
    test('Pokemon type shown on screen', () => {
      const mockFavById = { 25: true };
      const mockById = Object.keys(mockFavById).map((key) => parseInt(key, 10));
      const mockPokemons = data.filter((pokemon) => mockById.includes(pokemon.id));
      const { getByTestId, getByText } = renderWithRouter(
        <Pokemon pokemon={ mockPokemons[0] } isFavorite={ mockFavById[mockById] } />,
      );

      const nameString = getByText(mockPokemons[0].type);
      expect(nameString).toBeInTheDocument();
      const nameTestId = getByTestId(/(pokemontype)/i);
      expect(nameTestId).toBeInTheDocument();
    });
    test('It\'s avarage weight', () => {
      const mockFavById = { 25: true };
      const mockById = Object.keys(mockFavById).map((key) => parseInt(key, 10));
      const mockPokemons = data.filter((pokemon) => mockById.includes(pokemon.id));
      const { getByTestId, getByText } = renderWithRouter(
        <Pokemon pokemon={ mockPokemons[0] } isFavorite={ mockFavById[mockById] } />,
      );

      const { value, measurementUnit } = mockPokemons[0].averageWeight;
      const nameString = getByText(`Average weight: ${value} ${measurementUnit}`);
      expect(nameString).toBeInTheDocument();
      const nameTestId = getByTestId(/(pokemon-weight)/i);
      expect(nameTestId).toBeInTheDocument();
    });
    test('It\'s immage with "src" and "alt"', () => {
      const mockFavById = { 25: true };
      const mockById = Object.keys(mockFavById).map((key) => parseInt(key, 10));
      const mockPokemons = data.filter((pokemon) => mockById.includes(pokemon.id));
      const { container, getByRole } = renderWithRouter(
        <Pokemon pokemon={ mockPokemons[0] } isFavorite={ mockFavById[mockById] } />,
      );

      const { image, name } = mockPokemons[0];
      const imgAlt = getByRole('img', { name: `${name} sprite` });
      expect(imgAlt).toBeInTheDocument();
      const imgSrc = container.querySelector('img').src;
      expect(imgSrc).toBe(image);
    });
  });
  describe('Test "pokemon details":', () => {
    test('Test if there is a link "/pokemons/<id>" to show "pokemon details"', () => {
      const mockFavById = { 25: true };
      const mockById = Object.keys(mockFavById).map((key) => parseInt(key, 10));
      const mockPokemons = data.filter((pokemon) => mockById.includes(pokemon.id));
      // don't need props for showDetailsLink, because default is true.
      const { getByRole } = renderWithRouter(
        <Pokemon pokemon={ mockPokemons[0] } isFavorite={ mockFavById[mockById] } />,
      );
      const details = getByRole('link', { name: /(more details)/i });
      expect(details).toBeInTheDocument();
      fireEvent.click(details);
    });
    test('Test if when clicked the redirection to link is made', () => {
      const mockFavById = { 25: true };
      const mockById = Object.keys(mockFavById).map((key) => parseInt(key, 10));
      const mockPokemons = data.filter((pokemon) => mockById.includes(pokemon.id));
      // don't need props for showDetailsLink, because default is true.
      const { getByRole, history } = renderWithRouter(
        <Pokemon pokemon={ mockPokemons[0] } isFavorite={ mockFavById[mockById] } />,
      );
      const details = getByRole('link', { name: /(more details)/i });
      fireEvent.click(details);
      const { pathname } = history.location;
      expect(pathname).toBe(`/pokemons/${mockById}`);
    });
    test('Test if the URL shown is changed ', () => {
      const mockFavById = { 25: true };
      const mockById = Object.keys(mockFavById).map((key) => parseInt(key, 10));
      const mockPokemons = data.filter((pokemon) => mockById.includes(pokemon.id));
      // don't need props for showDetailsLink, because default is true.
      const { getByRole, history } = renderWithRouter(
        <Pokemon pokemon={ mockPokemons[0] } isFavorite={ mockFavById[mockById] } />,
      );
      const details = getByRole('link', { name: /(more details)/i });
      fireEvent.click(details);
      const { pathname } = history.location;
      expect(pathname).not.toBe('/');
    });
  });
  describe('Test if there are stars on favorited pokemons:', () => {
    test('the icon must be a image with source path "/star-icon.svg"', () => {
      const mockFavById = { 25: true };
      const mockById = Object.keys(mockFavById).map((key) => parseInt(key, 10));
      const mockPokemons = data.filter((pokemon) => mockById.includes(pokemon.id));
      // don't need props for showDetailsLink, because default is true.
      const { getByRole } = renderWithRouter(
        <Pokemon pokemon={ mockPokemons[0] } isFavorite={ mockFavById[mockById] } />,
      );
      const { name } = mockPokemons[0];
      const img = getByRole('img', { name: `${name} is marked as favorite` });
      expect(img.src).toBe('http://localhost/star-icon.svg');
    });
    test('the icon must have alt whith "pokemon" is marked as favorite', () => {
      const mockFavById = { 25: true };
      const mockById = Object.keys(mockFavById).map((key) => parseInt(key, 10));
      const mockPokemons = data.filter((pokemon) => mockById.includes(pokemon.id));
      // don't need props for showDetailsLink, because default is true.
      const { getByRole } = renderWithRouter(
        <Pokemon pokemon={ mockPokemons[0] } isFavorite={ mockFavById[mockById] } />,
      );
      const { name } = mockPokemons[0];
      const img = getByRole('img', { name: `${name} is marked as favorite` });
      expect(img.alt).toBe(`${name} is marked as favorite`);
    });
  });
});
