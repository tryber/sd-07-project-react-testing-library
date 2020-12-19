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
});
