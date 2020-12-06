import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';

describe('Requiriment 05', () => {
  test('1/7', () => {
    // Thiago Pederzolli - linha 11;
    // https://github.com/tryber/sd-07-project-react-testing-library/pull/12/files;

    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

    const pokedexTitle = screen.getByText(/encountered pokémons/i);

    expect(pokedexTitle).toBeInTheDocument();
    expect(pokedexTitle.tagName).toBe('H2');
  });

  test('2/7', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

    const nextPokemonButton = screen.getByText(/próximo pokémon/i);
    const firstPokemon = screen.getByText(/pikachu/i);

    expect(nextPokemonButton).toBeInTheDocument();
    expect(firstPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    const secondPokemon = screen.getByText(/charmander/i);
    expect(secondPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    const thirdPokemon = screen.getByText(/caterpie/i);
    expect(thirdPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    const fourthPokemon = screen.getByText(/ekans/i);
    expect(fourthPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    const fifthPokemon = screen.getByText(/alakazam/i);
    expect(fifthPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    const sixthPokemon = screen.getByText(/mew/i);
    expect(sixthPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    const seventhPokemon = screen.getByText(/rapidash/i);
    expect(seventhPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    const eighthPokemon = screen.getByText(/snorlax/i);
    expect(eighthPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    const lastPokemon = screen.getByText(/dragonair/i);
    expect(lastPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    expect(firstPokemon).toBeInTheDocument();
  });

  test('3/7', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

    let currentPokemon = screen.getAllByTestId('pokemon-name');
    const nextPokemonButton = screen.getByTestId('next-pokemon');
    expect(currentPokemon.length).toBe(1);

    fireEvent.click(nextPokemonButton);
    currentPokemon = screen.getAllByTestId('pokemon-name');
    expect(currentPokemon.length).toBe(1);
  });

});
