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
    expect(actualPokemon).toBe(pokemons[0].name);

    const nextBtn = getByTestId('next-pokemon');
    expect(nextBtn.innerHTML).toBe('Próximo pokémon');
    fireEvent.click(nextBtn);

    actualPokemon = getByTestId('pokemon-name').innerHTML;
    expect(actualPokemon).not.toBe(pokemons[0].name);
    expect(actualPokemon).toBe(pokemons[1].name);
  });

  it('Mostrar primeiro da lista quando estiver no último e clicar próximo', () => {
    const { getByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    let actualPokemon = getByTestId('pokemon-name').innerHTML;
    const nextBtn = getByTestId('next-pokemon');

    expect(actualPokemon).toBe(pokemons[0].name);

    pokemons.forEach((element) => {
      fireEvent.click(nextBtn);
      console.log(element.name);
    });

    actualPokemon = getByTestId('pokemon-name').innerHTML;
    expect(actualPokemon).toBe(pokemons[0].name);
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

  it('Deve filtrar por tipo', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const pokemonsType = getAllByTestId('pokemon-type-button');
    pokemonsType.forEach((type) => {
      fireEvent.click(type);

      const numberOfPokemons = pokemons.filter((pokemon) => (
        type.innerHTML === pokemon.type
      ));
      numberOfPokemons.forEach(() => {
        const pokemonType = getByTestId('pokemonType').innerHTML;
        expect(type.innerHTML).toBe(pokemonType);
      });
    });
  });

  it('Botão para resetar o filtro', () => {
    const { getByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const nextBtn = getByTestId('next-pokemon');
    pokemons.forEach((pokemon) => {
      const pokemonRendered = getByTestId('pokemon-name').innerHTML;
      expect(pokemon.name).toBe(pokemonRendered);
      fireEvent.click(nextBtn);
    });
  });

  it('Botão próximo Pokemon desabilitado', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const pokemonsType = getAllByTestId('pokemon-type-button');
    pokemonsType.forEach((type) => {
      fireEvent.click(type);
      const numberOfPokemons = pokemons.filter((pokemon) => (
        type.innerHTML === pokemon.type
      ));
      if (numberOfPokemons.length === 1) {
        const nextBtn = getByTestId('next-pokemon');
        expect(nextBtn).toHaveAttribute('disabled');
      }
    });
  });
});
