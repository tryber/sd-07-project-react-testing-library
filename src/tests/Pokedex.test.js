import { cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';

afterEach(cleanup);

describe('Pokedex - teste de Conteúdo', () => {

  const isPokemonFavoriteById = {
    4: false,
    10: false,
    23: false,
    25: false,
    65: false,
    78: false,
    143: false,
    148: false,
    151: true,
  };

  const typesOfPokemons = 7;

  it('Deve renderizar um h2 com o texto "Encountered pokémons"', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const h2Element = getByRole('heading', { level: 2 });
    const h2Content = getByText('Encountered pokémons');
    expect(h2Element).toBeInTheDocument();
    expect(h2Content).toBeInTheDocument();
  });

  it('Deve renderizar o próximo pokemon no clique do botão', () => {
    const { getByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    let actualPokemon = getByTestId('pokemon-name').innerHTML;
    expect(actualPokemon).toBe('Pikachu');

    const nextBtn = getByTestId('next-pokemon');
    expect(nextBtn.innerHTML).toBe('Próximo pokémon');
    fireEvent.click(nextBtn);

    actualPokemon = getByTestId('pokemon-name').innerHTML;
    expect(actualPokemon).not.toBe(pokemons[0].name);
    expect(actualPokemon).toBe(pokemons[1].name);
  });

  it('Deve mostrar um pokemon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const pokemonsList = getAllByTestId('pokemon-name');
    expect(pokemonsList.length).toBe(1);
  });

  it('Deve haver 7 botões de tipo', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const pokemonsType = getAllByTestId('pokemon-type-button');
    expect(pokemonsType.length).toBe(typesOfPokemons);
  });
});
