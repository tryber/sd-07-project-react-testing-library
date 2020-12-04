import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('renders the App screen', () => {
  it('renders the text `Encountered pokémons`', () => {
    render(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
      { wrapper: MemoryRouter },
    );

    expect(screen.getByText(/Encountered pokémons/i).tagName.toLowerCase()).toBe('h2');
  });

  it('renders next pokemon', () => {
    render(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
      { wrapper: MemoryRouter },
    );

    const nextButton = screen.getByTestId('next-pokemon');
    expect(nextButton.textContent).toBe('Próximo pokémon');

    expect(screen.getByTestId('pokemon-name').textContent).toBe('Pikachu');
    fireEvent.click(nextButton);
    expect(screen.getByTestId('pokemon-name').textContent).toBe('Charmander');
  });

  it('renders the pokemon filters', () => {
    render(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
      { wrapper: MemoryRouter },
    );

    const filters = screen.getAllByTestId('pokemon-type-button');
    expect(filters[0].textContent).toBe('Electric');
    expect(filters[1].textContent).toBe('Fire');
    expect(filters[2].textContent).toBe('Bug');
    expect(filters[3].textContent).toBe('Poison');
    expect(filters[4].textContent).toBe('Psychic');
    expect(filters[5].textContent).toBe('Normal');
    expect(filters[6].textContent).toBe('Dragon');

    fireEvent.click(filters[1]);
    expect(screen.getByTestId('pokemon-name').textContent).toBe('Charmander');

    const nextButton = screen.getByTestId('next-pokemon');
    expect(nextButton.textContent).toBe('Próximo pokémon');

    fireEvent.click(nextButton);
    expect(screen.getByTestId('pokemon-name').textContent).toBe('Rapidash');
  });

  it('renders the reset filter', () => {
    render(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
      { wrapper: MemoryRouter },
    );

    expect(screen.getByTestId('pokemon-reset-type-button').textContent).toBe('All');
  });

  it('renders disabled next button', () => {
    render(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
      { wrapper: MemoryRouter },
    );

    const filters = screen.getAllByTestId('pokemon-type-button');
    fireEvent.click(filters[2]);
    expect(screen.getByTestId('next-pokemon').disabled).toBe(true);
  });

  it('renders the full list of pokemons', () => {
    render(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
      { wrapper: MemoryRouter },
    );

    fireEvent.click(screen.getByTestId('pokemon-reset-type-button'));

    const nextButton = screen.getByTestId('next-pokemon');
    expect(nextButton.textContent).toBe('Próximo pokémon');

    expect(screen.getByTestId('pokemon-name').textContent).toBe('Pikachu');
    fireEvent.click(nextButton);
    expect(screen.getByTestId('pokemon-name').textContent).toBe('Charmander');
    fireEvent.click(nextButton);
    expect(screen.getByTestId('pokemon-name').textContent).toBe('Caterpie');
    fireEvent.click(nextButton);
    expect(screen.getByTestId('pokemon-name').textContent).toBe('Ekans');
    fireEvent.click(nextButton);
    expect(screen.getByTestId('pokemon-name').textContent).toBe('Alakazam');
    fireEvent.click(nextButton);
    expect(screen.getByTestId('pokemon-name').textContent).toBe('Mew');
    fireEvent.click(nextButton);
    expect(screen.getByTestId('pokemon-name').textContent).toBe('Rapidash');
    fireEvent.click(nextButton);
    expect(screen.getByTestId('pokemon-name').textContent).toBe('Snorlax');
    fireEvent.click(nextButton);
    expect(screen.getByTestId('pokemon-name').textContent).toBe('Dragonair');
    fireEvent.click(nextButton);
    expect(screen.getByTestId('pokemon-name').textContent).toBe('Pikachu');
  });
});
