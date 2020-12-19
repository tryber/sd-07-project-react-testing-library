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
  describe('Testing Pokemon card', () => {
    it(`Must contain a navigation link to show details of this pokemon.
    Link must have the url /pokemons/<id>`, () => {
      renderWithRouter(<App />);

      pokemons.forEach((pokemon) => {
        const pokemonLink = screen.getByRole('link', { name: 'More details' });
        expect(pokemonLink).toBeInTheDocument();
        // Linha a seguir adaptada a partir da solução feita por Gabriel Deori:
        expect(pokemonLink.pathname).toBe(`/pokemons/${pokemon.id}`);

        const nextBtn = screen.getByTestId('next-pokemon');
        fireEvent.click(nextBtn);
      });
    });
  });

  describe('Testing link redirection', () => {
    it('Must be working correctly', () => {
      const { history } = renderWithRouter(<App />);

      const pokemonLink = screen.getByRole('link', { name: 'More details' });
      const home = screen.getByText('Encountered pokémons');
      expect(home).toBeInTheDocument();

      fireEvent.click(pokemonLink);
      const path = history.location.pathname;
      expect(path).not.toBe(home);
    });
    it(`Must navigate to pokemon details page. Navigator
    URL must be /pokemon/<id>`, () => {
      const { history } = renderWithRouter(<App />);

      const pokemonLink = screen.getByRole('link', { name: 'More details' });
      const home = screen.getByText('Encountered pokémons');
      expect(home).toBeInTheDocument();

      fireEvent.click(pokemonLink);
      const path = history.location.pathname;
      expect(path).toBe(`/pokemons/${pokemons[0].id}`);
    });
  });
  describe('Testing star icon on favorite pokemons', () => {
    it(`Must have a image with the src attribute "/star-icon.svg" and
    the alt attribute "<pokemon> is marked as favorite"`,
    () => {
      renderWithRouter(<App />);

      const pokemonLink = screen.getByRole('link', { name: 'More details' });
      fireEvent.click(pokemonLink);

      let selectFavoritePokemon = screen.getByRole('checkbox', { checked: false });
      expect(selectFavoritePokemon).toBeInTheDocument();
      fireEvent.click(selectFavoritePokemon);
      selectFavoritePokemon = screen.getByRole('checkbox', { checked: true });
      expect(selectFavoritePokemon).toBeInTheDocument();

      const starIcon = screen.getByAltText('Pikachu is marked as favorite');
      expect(starIcon).toBeInTheDocument();
      expect(starIcon.src).toMatch('/star-icon.svg');
    });
  });
});
