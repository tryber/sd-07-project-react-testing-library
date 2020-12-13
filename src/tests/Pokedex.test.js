import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('testing Pokedex.js', () => {
  test('test if the page has h2', () => {
    const { getByText } = renderWithRouter(<App />);

    const h2Tag = getByText(/Encountered pokémons/i);
    expect(h2Tag).toBeInTheDocument();
    expect(h2Tag.tagName).toBe('H2');
  });

  test('test if pokemons change clicking in the button', () => {
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
    fireEvent.click(getByText(/Próximo pokémon/i));

    const Rapidash = getByText(/Rapidash/i);
    expect(Rapidash).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));

    const Snorlax = getByText(/Snorlax/i);
    expect(Snorlax).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));

    const Dragonair = getByText(/Dragonair/i);
    expect(Dragonair).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));

    const Pikachu = getByText(/Pikachu/i);
    expect(Pikachu).toBeInTheDocument();
  });

  test('test if there is just 1 pokemon on the sceen', () => {
    const { getByText, container } = renderWithRouter(<App />);

    while (pokemons.length < 9) {
      const imgOfPoke = container.querySelectorAll('img');
      expect(imgOfPoke.length.toString()).toBe('1');
      fireEvent.click(getByText(/Próximo pokémon/i));
    }
  });

  test('test if there is filter buttons on Pokédex', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    const type = getByText('Psychic');
    fireEvent.click(type);
    const pokeType = getByTestId('pokemonType').innerHTML;
    expect(pokeType).toBe('Psychic');
  });

  test('test if pokedex has filter buttons', () => {
    const { getByText } = renderWithRouter(<App />);

    const typeAll = getByText('All');
    expect(typeAll).toBeInTheDocument();
    fireEvent.click(typeAll);

    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));

    const Charmander = getByText(/Charmander/i);
    expect(Charmander).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
  });

  test('test if type button is dinamic', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const filters = getAllByTestId('pokemon-type-button');
    expect(filters.length.toString()).toBe('7');
  });

  test('test id porximo Pokemon button is desable', () => {
    const { getByText } = renderWithRouter(<App />);

    const desableButton = getByText(/Próximo pokémon/i);
    fireEvent.click(desableButton);

    fireEvent.click(getByText(/Electric/i));
    fireEvent.click(desableButton);
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();

    fireEvent.click(getByText(/All/i));

    fireEvent.click(getByText(/Bug/i));
    fireEvent.click(desableButton);
    const Caterpie = getByText(/Caterpie/i);
    expect(Caterpie).toBeInTheDocument();

    fireEvent.click(getByText(/Poison/i));
    fireEvent.click(desableButton);
    const Ekans = getByText(/Ekans/i);
    expect(Ekans).toBeInTheDocument();

    fireEvent.click(getByText(/Normal/i));
    fireEvent.click(desableButton);
    const Snorlax = getByText(/Snorlax/i);
    expect(Snorlax).toBeInTheDocument();

    fireEvent.click(getByText(/Dragon/i));
    fireEvent.click(desableButton);
    const Dragonair = getByText(/Dragonair/i);
    expect(Dragonair).toBeInTheDocument();
  });
});
