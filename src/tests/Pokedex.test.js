import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import { fireEvent } from '@testing-library/react';

describe('testing Pokedex.js', () => {
  test('testing if the page has h2', () => {
    const { getByText } = renderWithRouter(<App />);

    const h2Tag = getByText(/Encountered pokémons/i);
    expect(h2Tag).toBeInTheDocument();
    expect(h2Tag.tagName).toBe('H2');
  });

  test('testing if pokemons change clicking in the button', () => {
    const { getByText } = renderWithRouter(<App />);

    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));

    const Charmander = getByText(/Charmander/i);
    expect(Charmander).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));

    const Caterpie = getByText(/Caterpie/i);
    expect(Caterpie).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));

    const Ekans = getByText(/Ekans/i);
    expect(Ekans).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));

    const Alakazam = getByText(/Alakazam/i);
    expect(Alakazam).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));

    const Mew = getByText(/Mew/i);
    expect(Mew).toBeInTheDocument();
  });

  test('', () => {});

  test('', () => {});

  test('', () => {});

  test('', () => {});

  test('', () => {});
});
