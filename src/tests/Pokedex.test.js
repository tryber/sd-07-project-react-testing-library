import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';

describe('Testando o arquivo Pokedex.js', () => {
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

  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonList }
      />,
    );

    const h2 = getByRole('heading');

    expect(h2).toHaveTextContent(/Encountered pokémons/i);
  });

  it('Teste se é exibido o próximo Pokémon da lista quando'
  + 'o botão Próximo pokémon é clicado', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonList }
      />,
    );

    // Referência: Rafael Machado
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByTestId('next-pokemon'));
    });

    expect(getByText(pokemons[0].name)).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    const { getByText, queryByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonList }
      />,
    );

    const nameOne = getByText('Pikachu');
    const nameTwo = queryByText('Rapidash');
    expect(nameOne).toBeInTheDocument();
    expect(nameTwo).not.toBeInTheDocument();
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonList }
      />,
    );

    fireEvent.click(getByText('Bug'));
    expect(getByText('Caterpie')).toBeInTheDocument();
    expect(getByTestId('pokemonType').textContent).toBe('Bug');
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonList }
      />,
    );

    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByTestId('next-pokemon'));
    });

    // Referência: Rafael Machado
    expect(getByText('All')).toBeInTheDocument();
    fireEvent.click(getByText('All'));
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByTestId('next-pokemon'));
    });
  });

  it('Teste se é criado, dinamicamente, um botão de filtro'
  + 'para cada tipo de Pokémon.', () => {
    const { queryAllByTestId, getAllByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonList }
      />,
    );

    // Referência: Vanessa Naara
    const pokemonsTypeList = queryAllByTestId('pokemon-type-button');
    const allTypesButton = getAllByRole('button')[0];

    expect(allTypesButton).toHaveTextContent('All');
    expect(pokemonsTypeList[0]).toHaveTextContent('Electric');
    expect(pokemonsTypeList[1]).toHaveTextContent('Fire');
    expect(pokemonsTypeList[2]).not.toHaveTextContent('Fire');
    expect(pokemonsTypeList[3]).toHaveTextContent('Poison');
    expect(pokemonsTypeList[4]).not.toHaveTextContent('Normal');
    expect(pokemonsTypeList[5]).toHaveTextContent('Normal');
    expect(pokemonsTypeList[6]).toHaveTextContent('Dragon');
  });

  it('O botão de Próximo pokémon deve ser desabilitado quando'
  + 'a lista filtrada de Pokémons tiver um só pokémon.'
  + 'para cada tipo de Pokémon.', () => {
    const { getByTestId, getByText, getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonList }
      />,
    );

    // Referência: Vanessa Naara
    const electricTypeButton = getAllByTestId('pokemon-type-button')[0];

    fireEvent.click(electricTypeButton);
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getByTestId('next-pokemon')).toBeDisabled();
  });
});
