import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testing Pokemon.js file:', () => {
  describe('It must be showed a information card about the pokemon on screen',
    () => {
      test('The correct name of the pokemon must be showed', () => {
        renderWithRouter(<App />);

        pokemons.forEach((pokemon) => {
          const pokemonName = screen.getByTestId('pokemon-name');
          expect(pokemonName).toBeInTheDocument();
          expect(pokemonName.innerHTML).toEqual(pokemon.name);

          const nextBtn = screen.getByTestId('next-pokemon');
          fireEvent.click(nextBtn);
        });
      });

      test('The correct type of the pokemon must be showed', () => {
        renderWithRouter(<App />);

        pokemons.forEach((pokemon) => {
          const pokemonType = screen.getByTestId('pokemonType');
          expect(pokemonType).toBeInTheDocument();
          expect(pokemonType.innerHTML).toEqual(pokemon.type);

          const nextBtn = screen.getByTestId('next-pokemon');
          fireEvent.click(nextBtn);
        });
      });

      test(`Average weight of pokemon must be showed as the following
    format: "Average weight: <value> <measurementUnit>"`, () => {
        renderWithRouter(<App />);

        pokemons.forEach((pokemon) => {
          const pokemonWeight = screen.getByTestId('pokemon-weight');
          const { averageWeight: { value, measurementUnit } } = pokemon;
          const averageWeight = `Average weight: ${value} ${measurementUnit}`;
          expect(pokemonWeight).toBeInTheDocument();
          expect(pokemonWeight.innerHTML).toEqual(averageWeight);

          const nextBtn = screen.getByTestId('next-pokemon');
          fireEvent.click(nextBtn);
        });
      });

      test(`Image of pokemon must be showed. It must have a src attribute
    with image URL and a alt attribute with text <name> sprite`, () => {
        renderWithRouter(<App />);

        pokemons.forEach((pokemon) => {
          const pokemonImage = screen.getByRole('img',
            { src: pokemon.image, alt: `${pokemon.name} sprite` });
          expect(pokemonImage).toBeInTheDocument();

          const nextBtn = screen.getByTestId('next-pokemon');
          fireEvent.click(nextBtn);
        });
      });
    });
});
