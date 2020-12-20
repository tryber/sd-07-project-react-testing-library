import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testing PokemonDetails.js file:', () => {
  describe(`Test if detailed information about
  the pokemon selected is showed`, () => {
    test('Page must have a text "<name> Details"', () => {
      const { history } = renderWithRouter(<App />);

      const pokemonLink = screen.getByRole('link', { name: 'More details' });
      fireEvent.click(pokemonLink);
      const path = history.location.pathname;
      expect(path).toBe(`/pokemons/${pokemons[0].id}`);

      const text = screen.getByText(`${pokemons[0].name} Details`);
      expect(text).toBeInTheDocument();
    });

    it('Should not exists a link to pokemon details', () => {
      const { history } = renderWithRouter(<App />);

      const pokemonLink = screen.getByRole('link', { name: 'More details' });
      fireEvent.click(pokemonLink);
      const path = history.location.pathname;
      expect(path).toBe(`/pokemons/${pokemons[0].id}`);

      expect(pokemonLink).not.toBeInTheDocument();
    });

    it('Should have a h2 heading with text "Summary"', () => {
      const { history } = renderWithRouter(<App />);

      const pokemonLink = screen.getByRole('link', { name: 'More details' });
      fireEvent.click(pokemonLink);
      const path = history.location.pathname;
      expect(path).toBe(`/pokemons/${pokemons[0].id}`);

      const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
      expect(summary).toBeInTheDocument();
    });

    it('Should have an overview paragraph about the pokemon', () => {
      const { history } = renderWithRouter(<App />);

      const pokemonLink = screen.getByRole('link', { name: 'More details' });
      fireEvent.click(pokemonLink);
      const path = history.location.pathname;
      expect(path).toBe(`/pokemons/${pokemons[0].id}`);

      const overviewParagraph = screen.getByText(`${pokemons[0].summary}`);
      expect(overviewParagraph).toBeInTheDocument();
    });
  });
  describe('Test if there is a section with maps to pokemon location', () => {
    test(`Details section must contain a h2 heading with
    text "Game Locations of <name>"`, () => {
      const { history } = renderWithRouter(<App />);

      const pokemonLink = screen.getByRole('link', { name: 'More details' });
      fireEvent.click(pokemonLink);
      const path = history.location.pathname;
      expect(path).toBe(`/pokemons/${pokemons[0].id}`);

      const text = screen.getByRole('heading',
        { level: 2, name: `Game Locations of ${pokemons[0].name}` });
      expect(text).toBeInTheDocument();
    });

    test('All pokemon locations must be exhibited', () => {
      const { history } = renderWithRouter(<App />);

      const pokemonLink = screen.getByRole('link', { name: 'More details' });
      fireEvent.click(pokemonLink);
      const path = history.location.pathname;
      expect(path).toBe(`/pokemons/${pokemons[0].id}`);

      const allLocation = screen.queryAllByAltText(`${pokemons[0].name} location`);
      expect(allLocation).toHaveLength(pokemons[0].foundAt.length);

      if (allLocation.length > 1) {
        allLocation.forEach((location) => expect(location).toBeInTheDocument());
      } else {
        expect(allLocation).toBeInTheDocument();
      }
    });
    it('Should be exhibited the name and image of each pokemon\'s location',
      () => {
        const { history } = renderWithRouter(<App />);

        const pokemonLink = screen.getByRole('link', { name: 'More details' });
        fireEvent.click(pokemonLink);
        const path = history.location.pathname;
        expect(path).toBe(`/pokemons/${pokemons[0].id}`);

        if (pokemons[0].foundAt.length > 1) {
          pokemons[0].foundAt.forEach((local) => {
            const nameLocation = screen.getByText(local.location);
            expect(nameLocation).toBeInTheDocument();
          });
        } else {
          const nameLocation = screen.getByText(pokemons[0].foundAt[0].location);
          expect(nameLocation).toBeInTheDocument();
        }

        const imageLocation = screen.getAllByAltText(`${pokemons[0].name} location`);
        if (imageLocation.length > 1) {
          imageLocation.forEach((map) => expect(map).toBeInTheDocument());
        } else {
          expect(imageLocation).toBeInTheDocument();
        }
      });
    test(`Image of pokemon location must have an src attribute
    with URL of location`, () => {
      const { history } = renderWithRouter(<App />);

      const pokemonLink = screen.getByRole('link', { name: 'More details' });
      fireEvent.click(pokemonLink);
      const path = history.location.pathname;
      expect(path).toBe(`/pokemons/${pokemons[0].id}`);

      const imageLocation = screen.getAllByAltText(`${pokemons[0].name} location`);
      if (imageLocation.length > 1) {
        imageLocation.forEach((image) => {
          const imageSrc = pokemons[0].foundAt
            .some((item) => image.src === item.map);
          expect(imageSrc).toBeTruthy();
        });
      } else {
        expect(imageLocation).toBeInTheDocument();
        expect(imageLocation.src).toMatch(pokemons[0].foundAt[0].map);
      }
    });
    test(`Image of pokemon location must have an alt attribute
    with text "<name> location"`, () => {
      const { history } = renderWithRouter(<App />);

      const pokemonLink = screen.getByRole('link', { name: 'More details' });
      fireEvent.click(pokemonLink);
      const path = history.location.pathname;
      expect(path).toBe(`/pokemons/${pokemons[0].id}`);

      const imageLocation = screen.getAllByAltText(`${pokemons[0].name} location`);
      if (imageLocation.length > 1) {
        imageLocation.forEach((map) => expect(map).toBeInTheDocument());
      } else {
        expect(imageLocation).toBeInTheDocument();
      }
    });
  });
  describe('Test if user can favorite a pokemon through the details page',
    () => {
      test('Page should have a checkbox to mark the pokemon as favorite',
        () => {
          const { history } = renderWithRouter(<App />);

          const pokemonLink = screen.getByRole('link', { name: 'More details' });
          fireEvent.click(pokemonLink);
          const path = history.location.pathname;
          expect(path).toBe(`/pokemons/${pokemons[0].id}`);

          const checkbox = screen.getByRole('checkbox',
            { name: 'Pokémon favoritado?' });
          expect(checkbox).toBeInTheDocument();
        });

      test(`Alternative clicks must add and remove the pokemon from
    favorite list`, () => {
        const { history } = renderWithRouter(<App />);

        const pokemonLink = screen.getByRole('link', { name: 'More details' });
        fireEvent.click(pokemonLink);
        const path = history.location.pathname;
        expect(path).toBe(`/pokemons/${pokemons[0].id}`);

        const checkbox = screen.getByRole('checkbox',
          { name: 'Pokémon favoritado?' });
        expect(checkbox).toBeInTheDocument();

        fireEvent.click(checkbox);
        const favoritePokemon = screen
          .getByAltText(`${pokemons[0].name} is marked as favorite`);
        expect(favoritePokemon).toBeInTheDocument();

        fireEvent.click(checkbox);
        expect(favoritePokemon).not.toBeInTheDocument();
      });

      test('Checkbox label should contain text "Pokémon favoritado?"',
        () => {
          const { history } = renderWithRouter(<App />);

          const pokemonLink = screen.getByRole('link', { name: 'More details' });
          fireEvent.click(pokemonLink);
          const path = history.location.pathname;
          expect(path).toBe(`/pokemons/${pokemons[0].id}`);

          const checkbox = screen.getByRole('checkbox',
            { name: 'Pokémon favoritado?' });
          expect(checkbox).toBeInTheDocument();
        });
    });
});
