import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Testa Pokedex.js- requirement 5', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const isPokemonFavoriteById = {};
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const heading = getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Encountered pokémons');
    expect(heading.tagName).toBe('H2');
  });

  it('O botão deve conter o texto Próximo pokémon', () => {
    const isPokemonFavoriteById = {};
    const { getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const nextButton = getByTestId('next-pokemon');
    expect(nextButton.type).toBe('button');
    expect(nextButton.textContent).toBe('Próximo pokémon');
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    const isPokemonFavoriteById = {};
    const { getByTestId, getByText, getAllByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const pokemonsQnt = pokemons.length;
    const nextButton = getByTestId('next-pokemon');

    const firstPokemon = getByText(pokemons[0].name);
    expect(firstPokemon).toBeInTheDocument();

    fireEvent.click(nextButton);

    const secondPokemon = getByText(pokemons[1].name);
    expect(secondPokemon).toBeInTheDocument();

    // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista
    const inicialIndex = 0;
    for (let index = inicialIndex; index < pokemonsQnt; index += 1) {
      fireEvent.click(nextButton);
    }
    expect(firstPokemon).toBeInTheDocument();
    // Teste se é mostrado apenas um Pokémon por vez
    const thereIsPokemon = getAllByText(/Average weight/i);
    expect(thereIsPokemon.length).toBe(1);
  });

  it('testa se todos os botões são renderizados', () => {
    const isPokemonFavoriteById = {};
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const buttons = getAllByTestId('pokemon-type-button');
    const numberOfButtons = 7;
    expect(buttons.length).toBe(numberOfButtons);
  });

  it('Ao selecionar um tipo a Pokédex deve mostrar somente pokémons daquele tipo', () => {
    const isPokemonFavoriteById = {};
    const { getAllByTestId, getByText, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const buttons = getAllByTestId('pokemon-type-button');
    const FireButton = buttons[1];
    const nextButton = getByTestId('next-pokemon');

    const FireFilteredPokemons = pokemons.filter((pokemon) => pokemon.type === 'Fire');

    fireEvent.click(FireButton);

    FireFilteredPokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const isPokemonFavoriteById = {};
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
    const nextButton = getByTestId('next-pokemon');
    // O texto do botão deve ser All
    const AllButton = getByText('All');
    expect(AllButton).toBeInTheDocument();

    const AllPokemons = pokemons;

    fireEvent.click(AllButton);
    AllPokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
  });

  it('Teste se é criado, dinamicamente um botão filtro para cada tipo de Pokémon', () => {
    const isPokemonFavoriteById = {};
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const typesOfPokemons = new Set(pokemons.map((pokemon) => pokemon.type)
      .flat()
      .sort());
    const allButton = getAllByTestId('pokemon-type-button');
    const typesOfButton = new Set(allButton.map((button) => button.textContent).sort());
    expect(typesOfButton).toEqual(typesOfPokemons);
  });

  it('Botão Próximo pokémon ser desable quando a list Pokémons for 1 pokémon', () => {
    const isPokemonFavoriteById = {};
    const { getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );

    const ElectricFilteredPokemons = pokemons
      .filter((pokemon) => pokemon.type === 'Fire').length;
    const nextButton = getByTestId('next-pokemon');
    if (ElectricFilteredPokemons <= 1) {
      expect(nextButton).toHaveAttribute('disabled');
    }

    expect(nextButton.type).toBe('button');
    expect(nextButton.textContent).toBe('Próximo pokémon');
  });
});
