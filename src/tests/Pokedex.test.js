import React from 'react';
import { fireEvent } from '@testing-library/react';
import TestingRouter from '../components/TestingRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

afterEach(cleanup);

// Referência: Alexandre Faustino
const isFavorite = {
  4: false,
  10: false,
  23: true,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: true,
};

describe('5th Req. | Testing Pokedex.js', () => {
  it('should render title', () => {
    const { getByText } = TestingRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const title = getByText('Encountered pokémons');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H2');
  });

  it('should render the next pokemon when click next button', () => {
    const { getByTestId } = TestingRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const nextBtn = getByTestId('next-pokemon');
    const pokemonName = getByTestId('pokemon-name');
    expect(nextBtn.innerHTML).toBe('Próximo pokémon');

    pokemons.forEach(({ name }) => {
      expect(pokemonName.innerHTML).toBe(name);
      fireEvent.click(nextBtn);
    });
    expect(pokemonName.innerHTML).toBe('Pikachu');
  });

  it('should render just one pokémon', () => {
    const { getByText, queryByText } = TestingRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    expect(getByText(pokemons[0].name)).toBeInTheDocument();
    expect(queryByText(pokemons[1].name)).not.toBeInTheDocument();
  });

  it('should render filter buttons', () => {
    const { getAllByTestId } = TestingRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const nextBtn = getByTestId('next-pokemon');
    const pokemonType = getByTestId('pokemonType');
    const filterButtons = getAllByTestId('pokemon-type-button');
    filterButtons.forEach((btn) => expect(btn).toBeInTheDocument());
    fireEvent.click(filterButtons[1]);
    expect(pokemonType.innerHTML).toBe('Fire');
    fireEvent.click(nextBtn);
    expect(pokemonType.innerHTML).toBe('Fire');
  });

  it('should render reset button', () => {
    const { getAllByTestId } = TestingRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const buttons = getAllByTestId('pokemon-type-button');
    const listOfTypes = pokemons.map((pokemon) => pokemon.type);
    buttons.forEach((btn) => {
      expect(listOfTypes).toContain(btn.innerHTML);
    });
  });

  it('should render dynamic filter buttons', () => {
    const { getByText, queryByTestId } = TestingRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const nextBtn = queryByTestId('next-pokemon');
    const allBtn = getByText('All');
    fireEvent.click(allBtn[1]);
    expect(nextBtn.disabled).toBe(true);
  });
});
