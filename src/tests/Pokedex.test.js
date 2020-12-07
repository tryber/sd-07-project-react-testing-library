import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const data = pokemons;
const favoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Testando o arquivo Pokedex.js', () => {
  it('deve exibir o próximo Pokémon quando o botão Próximo pokémon é clicado', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ favoriteById } />,
    );

    const nextPokemon = getByText(/Próximo pokémon/i);
    let currencyPokemon = getByText(data[0].name);
    expect(currencyPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemon);
    currencyPokemon = getByText(data[1].name);
    expect(currencyPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemon);
    currencyPokemon = getByText(data[2].name);
    expect(currencyPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemon);
    currencyPokemon = getByText(data[3].name);
    expect(currencyPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemon);
    currencyPokemon = getByText(data[4].name);
    expect(currencyPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemon);
    currencyPokemon = getByText(data[5].name);
    expect(currencyPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemon);
    currencyPokemon = getByText(data[6].name);
    expect(currencyPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemon);
    currencyPokemon = getByText(data[7].name);
    expect(currencyPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemon);
    currencyPokemon = getByText(data[8].name);
    expect(currencyPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemon);
    currencyPokemon = getByText(data[0].name);
    expect(currencyPokemon).toBeInTheDocument();
  });

  it('deve mostrar apenas um Pokémon por vez', () => {
    const { queryByText } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ favoriteById } />,
    );
    const nextPokemon = queryByText(/Próximo pokémon/i);
    let currencyPokemon = queryByText(data[0].name);
    expect(currencyPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemon);
    const previousPokemon = queryByText(data[0].name);
    currencyPokemon = queryByText(data[1].name);
    expect(currencyPokemon).toBeInTheDocument();
    expect(previousPokemon).not.toBeInTheDocument();
  });

  it('deve ver se a Pokédex tem os botões de filtro', () => {
    const { queryByTestId, queryByText, queryAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ favoriteById } />,
    );
    const buttons = queryAllByTestId('pokemon-type-button');
    fireEvent.click(buttons[0]);
    const nextPokemon = queryByText(/Próximo pokémon/i);
    expect(nextPokemon.disabled).toBe(true);

    fireEvent.click(buttons[1]);
    const pokemonType = queryByTestId('pokemonType');
    expect(buttons[1].textContent).toBe(pokemonType.textContent);
  });

  it('deve ver se a Pokédex contém um botão para resetar o filtro', () => {
    const { queryByTestId, queryAllByTestId, queryByText } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ favoriteById } />,
    );
    const buttons = queryAllByTestId('pokemon-type-button');
    const buttonAll = queryByText('All');
    fireEvent.click(buttons[0]);
    let buttonNext = queryByTestId('next-pokemon');
    expect(buttonNext.disabled).toBe(true);

    fireEvent.click(buttonAll);
    buttonNext = queryByTestId('next-pokemon');
    expect(buttonNext.disabled).toBe(false);
  });

  it('verifica se é criado um botão de filtro para cada tipo de Pokémon.', () => {
    const { queryAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ favoriteById } />,
    );
    const types = data.map((pokemon) => pokemon.type);
    const typeFilter = types.filter((pokemon, index) => types.indexOf(pokemon) === index);
    const buttons = queryAllByTestId('pokemon-type-button');
    expect(buttons.length).toBe(typeFilter.length);
  });

  it('deve ver se a página tem um heading h2 com o texto Encountered pokémons.', () => {
    const { queryByText } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ favoriteById } />,
    );
    const heading = queryByText('Encountered pokémons');
    expect(heading.tagName).toBe('H2');
  });
});
