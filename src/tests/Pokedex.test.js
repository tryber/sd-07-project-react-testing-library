import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import { fireEvent, screen } from '@testing-library/react';
import pokemons from '../data';

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

  test('test if there is just 1 pokemon on the sceen', () => {
    const { getByText, container } = renderWithRouter(<App />);

    for(let index = 0; index < pokemons.length; index+=1) {
      const imgOfPoke2 = container.querySelectorAll('img');
      expect(imgOfPoke2.length.toString()).toBe('1');
      fireEvent.click(getByText(/Próximo pokémon/i));
    }
    /*const imgOfPoke = container.querySelectorAll('img');
    expect(imgOfPoke.length.toString()).toBe('1');

    fireEvent.click(getByText(/Próximo pokémon/i));
    const imgOfPoke2 = container.querySelectorAll('img');
    expect(imgOfPoke2.length.toString()).toBe('1');

    fireEvent.click(getByText(/Próximo pokémon/i));
    const imgOfPoke3 = container.querySelectorAll('img');
    expect(imgOfPoke3.length.toString()).toBe('1');*/
  });

  test('', () => {});

  test('', () => {});

  test('', () => {});

  test('', () => {});
});
