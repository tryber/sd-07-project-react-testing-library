import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('testing pokedex archive', () => {
  test('next pokemon button ', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ [...pokemons] }
        isPokemonFavoriteById={ { 25: false } }
      />,
    );

    const h2 = getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(h2).toBeInTheDocument();
  });

  test('next pokemon button ', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ [...pokemons] }
        isPokemonFavoriteById={ { 25: false } }
      />,
    );

    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Charmander/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Caterpie/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Ekans/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Alakazam/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Mew/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Rapidash/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Snorlax/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Dragonair/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });

  test('show only one pokemon', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ [...pokemons] }
        isPokemonFavoriteById={ { 25: false } }
      />,
    );

    const pokemon = getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  test('pokemon filtered by type', () => {
    const { getAllByTestId, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ [...pokemons] }
        isPokemonFavoriteById={ { 25: false } }
      />,
    );

    const typeButton = getAllByTestId('pokemon-type-button');
    fireEvent.click(typeButton[3]);
    expect(getByText(/Ekans/i)).toBeInTheDocument();
  });

  test('pokemon filter reloaded', () => {
    const { getAllByTestId, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ [...pokemons] }
        isPokemonFavoriteById={ { 25: false } }
      />,
    );

    const typeButton = getAllByTestId('pokemon-type-button');
    fireEvent.click(typeButton[3]);
    expect(getByText(/Ekans/i)).toBeInTheDocument();
    fireEvent.click(getByText(/All/i));
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Charmander/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Caterpie/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Ekans/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Alakazam/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Mew/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Rapidash/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Snorlax/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Dragonair/i)).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });

  test('pokemon filter buttons', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ [...pokemons] }
        isPokemonFavoriteById={ { 25: false } }
      />,
    );

    const typeLength = 7;
    const typeButton = getAllByTestId('pokemon-type-button');
    expect(typeButton.length).toBe(typeLength);
  });

  test('a button for each type', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ [...pokemons] }
        isPokemonFavoriteById={ { 25: false } }
      />,
    );

    expect(getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Electric' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Fire' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Bug' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Poison' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Psychic' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Normal' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'Dragon' })).toBeInTheDocument();
  });

  test('disable next pokemon button', () => {
    const { getByText, getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ [...pokemons] }
        isPokemonFavoriteById={ { 25: false } }
      />,
    );

    fireEvent.click(getByRole('button', { name: 'Electric' }));
    const nextButton = getByText(/Próximo pokémon/i);
    expect(nextButton.disabled).toBe(true);
  });
});
