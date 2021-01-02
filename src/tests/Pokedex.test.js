import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import TestingRouter from '../components/TestingRouter';
import { Pokedex } from '../components';
import pokemons from '../data';

afterEach(cleanup);

describe('fifth requirement', () => {
  // Inspirado no projeto de Alexandre Faustino
  const favoritePokemonList = {
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
  it('should render an heading H2 with the text `Encountered pokémons`', () => {
    const { getByText } = TestingRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonList }
      />,
    );
    const pokedexText = getByText(/encountered pokémons/i);
    expect(pokedexText).toBeInTheDocument();
  });

  it('should render the next pokémon when press next button', () => {
    // Inspirado em Alexandre Faustino
    const { getByTestId, getByText } = TestingRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonList }
      />,
    );
    const nextBtn = getByTestId('next-pokemon');
    expect(nextBtn.innerHTML).toBe('Próximo pokémon');

    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(nextBtn);
    });
    expect(getByText(pokemons[0].name)).toBeInTheDocument();
  });

  it('should render just one Pokémon at time', () => {
    const { getAllByTestId } = TestingRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonList }
      />,
    );
    const pokemon = getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  it('should render filter buttons', () => {
    const { getAllByTestId, getByText, getByTestId } = TestingRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonList }
      />,
    );
    const eletricBtn = (getAllByTestId('pokemon-type-button'))[0];
    fireEvent.click(eletricBtn);
    expect(getByText(/pikachu/i)).toBeInTheDocument();
    expect(getByTestId('pokemonType').textContent).toBe('Electric');
  });

  it('should render All button', () => {
    const { getByText } = TestingRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonList }
      />,
    );
    const allBtn = getByText(/all/i);
    expect(allBtn).toBeInTheDocument();
  });
});
