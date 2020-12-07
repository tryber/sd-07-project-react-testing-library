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

  test('4/7', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

    const pokemonTypeButtons = screen.getAllByTestId('pokemon-type-button');
    const allTypesButton = screen.getByText(/all/i);
    const nextPokemonButton = screen.getByTestId('next-pokemon');

    expect(allTypesButton).toBeInTheDocument();
    expect(pokemonTypeButtons.length).toBe(7);
    pokemonTypeButtons.forEach((currentButton) => expect(currentButton).toBeInTheDocument());

    fireEvent.click(pokemonTypeButtons[1]);
    let currentType = screen.getAllByText(/fire/i);
    let currentPokemon = screen.getByText(/charmander/i);
    expect(currentType.length).toBe(2);
    expect(currentPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    currentType = screen.getAllByText(/fire/i);
    currentPokemon = screen.getByText(/rapidash/i);
    expect(currentType.length).toBe(2);
    expect(currentPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    currentType = screen.getAllByText(/fire/i);
    currentPokemon = screen.getByText(/charmander/i);
    expect(currentType.length).toBe(2);
    expect(currentPokemon).toBeInTheDocument();
  });

  test('5/7', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

    const allTypesButton = screen.getByText(/all/i);
    const nextPokemonButton = screen.getByTestId('next-pokemon');
    let currentPokemon = screen.getByText(/pikachu/i);

    expect(currentPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    currentPokemon = screen.getByText(/charmander/i);
    expect(currentPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    currentPokemon = screen.getByText(/caterpie/i);
    expect(currentPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    currentPokemon = screen.getByText(/ekans/i);
    expect(currentPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    currentPokemon = screen.getByText(/alakazam/i);
    expect(currentPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    currentPokemon = screen.getByText(/mew/i);
    expect(currentPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    currentPokemon = screen.getByText(/rapidash/i);
    expect(currentPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    currentPokemon = screen.getByText(/snorlax/i);
    expect(currentPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    currentPokemon = screen.getByText(/dragonair/i);
    expect(currentPokemon).toBeInTheDocument();

    expect(allTypesButton).toBeInTheDocument();

    fireEvent.click(allTypesButton);

    currentPokemon = screen.getByText(/pikachu/i);
    expect(currentPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    currentPokemon = screen.getByText(/charmander/i);
    expect(currentPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    currentPokemon = screen.getByText(/caterpie/i);
    expect(currentPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    currentPokemon = screen.getByText(/ekans/i);
    expect(currentPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    currentPokemon = screen.getByText(/alakazam/i);
    expect(currentPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    currentPokemon = screen.getByText(/mew/i);
    expect(currentPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    currentPokemon = screen.getByText(/rapidash/i);
    expect(currentPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    currentPokemon = screen.getByText(/snorlax/i);
    expect(currentPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    currentPokemon = screen.getByText(/dragonair/i);
    expect(currentPokemon).toBeInTheDocument();
  });

  test('6/7', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);

    const pokemonTypeButtons = screen.getAllByTestId('pokemon-type-button');
    const arrElectricValue = screen.getAllByText(/electric/i);

    expect(screen.getByText(/all/i)).toBeInTheDocument();
    expect(arrElectricValue[1]).toBeInTheDocument();
    expect(screen.getByText(/all/i)).toBeInTheDocument();
    expect(screen.getByText(/fire/i)).toBeInTheDocument();
    expect(screen.getByText(/all/i)).toBeInTheDocument();
    expect(screen.getByText(/bug/i)).toBeInTheDocument();
    expect(screen.getByText(/all/i)).toBeInTheDocument();
    expect(screen.getByText(/poison/i)).toBeInTheDocument();
    expect(screen.getByText(/all/i)).toBeInTheDocument();
    expect(screen.getByText(/psy/i)).toBeInTheDocument();
    expect(screen.getByText(/all/i)).toBeInTheDocument();
    expect(screen.getByText(/normal/i)).toBeInTheDocument();
    expect(screen.getByText(/all/i)).toBeInTheDocument();
    expect(screen.getByText(/dragon/i)).toBeInTheDocument();

    expect(pokemonTypeButtons.length).toBe(7);
  });
});
