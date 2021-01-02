import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import TestingRouter from '../components/TestingRouter';
import { Pokedex } from '../components';
import pokemons from '../data';

afterEach(cleanup);

describe('fifth requirement', () => {
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
  }
  it('should render heading with the text Encountered pokémons', () => {
    const { getByRole } = TestingRouter (
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavorite }
      />,
    )
    const heading = getByRole('heading');
    expect(heading).toBeInTheDocument();
  });
  it('should render render the next pokémon when clicking next buttom', () => {
    const { getByTestId } = TestingRouter (
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const nextBtn = getByTestId('next-pokemon');
    const pokemonName = getByTestId('pokemon-name');
    expect(nextBtn.innerHTML).toBe('Próximo pokémon');

    pokemons.forEach((pokemon) => {
      expect(pokemonName.innerHTML).toBe(pokemon.name);
      fireEvent.click(nextBtn);
    })
    expect(pokemonName.innerHTML).toBe('Pikachu');
  });
  it('should render just one pokémon at time', () => {
    const { getAllByTestId } = TestingRouter (
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const pokemonName = getAllByTestId('pokemon-name');
    expect(pokemonName.length).toBe(1);
  });
  it('should render filter buttons', () => {
    const { getAllByTestId, getByTestId } = TestingRouter (
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const nextBtn = getByTestId('next-pokemon');
    const pokemonType = getByTestId('pokemonType');
    const filterBtns = getAllByTestId('pokemon-type-button');
    filterBtns.forEach((type) => expect(type).toBeInTheDocument());
    fireEvent.click(filterBtns[1]);
    expect(pokemonType.innerHTML).toBe('Fire');
    fireEvent.click(nextBtn);
    expect(pokemonType.innerHTML).toBe('Fire');
  });
  it('should render reset button', () => {
    // Referência: Alexandre Faustino
    const { getByTestId, getByText, getAllByRole } = TestingRouter (
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const nextBtn = getByTestId('next-pokemon');
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(nextBtn);
    });
    const buttons = getAllByRole('button');
    const allBtn = buttons[0];
    expect(allBtn.innerHTML).toBe('All');
    fireEvent.click(allBtn);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(nextBtn);
    });
  });
  it('shouldnt render next button if theres just one pokémon', () => {
    const { getByText, getAllByRole } = TestingRouter (
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const buttons = getAllByRole('button');
    const nextPokemon = getByText(/próximo pokémon/i);
    fireEvent.click(buttons[1]);
    expect(nextPokemon.disabled).toBe(true);
  });
});
