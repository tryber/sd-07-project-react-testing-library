import React from 'react';
import { fireEvent } from '@testing-library/react';
import TestingRouter from '../components/TestingRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

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
    const { getByText } = TestingRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const nextBtn = getByText(/próximo pokémon/i);
    pokemons.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(nextBtn);
    });
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('should render just one pokémon', () => {
    const { queryByText } = TestingRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    expect(queryByText('Pikachu')).toBeInTheDocument();
    expect(queryByText('Charmander')).not.toBeInTheDocument();
  });

  it('should render filter buttons', () => {
    const { getAllByTestId, getByTestId } = TestingRouter(
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
    const { getByTestId, getByText } = TestingRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavorite }
      />,
    );
    const nextBtn = getByTestId('next-pokemon');
    expect(getByText('Pikachu')).toBeInTheDocument();
    fireEvent.click(nextBtn);
    expect(getByText('Charmander')).toBeInTheDocument();

    const allBtn = getByText('All');
    expect(allBtn).toBeInTheDocument();
    fireEvent.click(allBtn);
    expect(getByText('Pikachu')).toBeInTheDocument();
    fireEvent.click(nextBtn);
    expect(getByText('Charmander')).toBeInTheDocument();
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
