import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import data from '../data';

describe('5. Testando o arquivo Pokedex.js', () => {
  it('A página contém um heading h2 com o texto Encountered pokémons.', () => {
    const isPokemonFavoriteById = {};

    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const h2 = getByRole('heading', { level: 2 });
    expect(h2.textContent).toBe('Encountered pokémons');
  });

  it('Exibe o próximo Pokémon quando o botão é clicado.', () => {
    const isPokemonFavoriteById = {};

    const { getByTestId, getByText } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const botaoProximo = getByTestId('next-pokemon');
    expect(botaoProximo.textContent).toBe('Próximo pokémon');

    const all = getByText(/All/i);
    fireEvent.click(all);

    data.forEach((pokemon, index) => {
      const pokemonName = getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();

      fireEvent.click(botaoProximo);

      const dataLength = data.length;
      const nextIndex = index === dataLength - 1 ? index - dataLength + 1 : index + 1;

      const nextPokemonName = getByText(data[nextIndex].name);
      expect(nextPokemonName).toBeInTheDocument();
    });
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const isPokemonFavoriteById = {};

    const { getByTestId, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const pokemonNames = getAllByTestId('pokemon-name');
    expect(pokemonNames.length).toBe(1);

    const botaoProximo = getByTestId('next-pokemon');
    fireEvent.click(botaoProximo);

    const pokemonNamesTwo = getAllByTestId('pokemon-name');
    expect(pokemonNamesTwo.length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const isPokemonFavoriteById = {};

    const { getByTestId, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const allBtns = getAllByTestId('pokemon-type-button');

    allBtns.forEach((btn) => {
      fireEvent.click(btn);
      const pokemonType = getByTestId('pokemonType').textContent;
      const equal = pokemonType === btn.textContent;
      expect(equal).toBe(true);
    });
  });

  it('A Pokédex deve circular somente pelos pokémons daquele tipo selecionado;', () => {
    const isPokemonFavoriteById = {};

    const { getByTestId, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const allBtns = getAllByTestId('pokemon-type-button');

    const pokemonType = getByTestId('pokemonType');

    allBtns.forEach((btn) => {
      fireEvent.click(btn);
      expect(btn.textContent).toBe(pokemonType.textContent);
    });
  });

  it('A Pokédex contém um botão para resetar o filtro', () => {
    const isPokemonFavoriteById = {};

    const { getByTestId, getByText } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const resetFilter = getByText(/All/i);
    fireEvent.click(resetFilter);
    const pokemonName = getByTestId('pokemon-name').textContent;
    expect(pokemonName).toBe('Pikachu');
    const pokemonType = getByTestId('pokemonType').textContent;
    expect(pokemonType).toBe('Electric');
  });

  it('É criado dinamicamente, um botão de filtro para cada tipo de Pokémon.', () => {
    const isPokemonFavoriteById = {};

    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const typesFromData = data.map((pokemon) => pokemon.type);
    const typesPokemons = [...new Set(typesFromData)].sort();

    const btsFilter = getAllByTestId('pokemon-type-button')
      .map((btn) => btn.textContent)
      .sort();

    expect(typesPokemons).toEqual(btsFilter);
  });

  it('O botão deve ser desabilitado quando tiver um só pokémon.', () => {
    const isPokemonFavoriteById = {};

    const { getAllByTestId, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const typesWhithOnePokemon = [
      'Electric',
      'Bug',
      'Poison',
      'Normal',
      'Dragon',
    ];

    const btsFilters = getAllByTestId('pokemon-type-button');

    const nextPokemon = getByTestId('next-pokemon');

    btsFilters.forEach((filter) => {
      fireEvent.click(filter);
      if (typesWhithOnePokemon.includes(filter.textContent)) {
        expect(nextPokemon).toHaveAttribute('disabled');
      }
    });
  });
});
