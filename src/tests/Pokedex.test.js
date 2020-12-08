import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import Pokedex from '../components/Pokedex';
import Data from '../data';
import App from '../App';

afterEach(cleanup);

describe('EX05 - Testando o arquivo Pokedex.js', () => {
  const isPokemonFavoriteById = {
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

  test('heading h2 com o texto Encountered pokémons', () => {
    const { getByText } = RenderWithRouter(
      <Pokedex pokemons={Data} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );

    const subtitle = getByText(/Encountered pokémons/i);

    expect(subtitle.tagName).toBe('H2');
    expect(subtitle).toBeInTheDocument();
  });

  test('Exibe próximo Pokémon quando o botão "Próximo pokémon" é clicado.', () => {
    const { getByText, getByTestId } = RenderWithRouter(
      <Pokedex pokemons={Data} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );

    const namePokemon1 = getByText(/Pikachu/i);
    expect(namePokemon1).toBeInTheDocument();

    const buttonNext = getByTestId('next-pokemon');
    expect(buttonNext).toBeInTheDocument();
    fireEvent.click(buttonNext);

    const namePokemon2 = getByText(/Charmander/i);
    expect(namePokemon2).toBeInTheDocument();
  });

  test('Pokemons deve ser mostrados sucessivamente ao clicar no botão', () => {
    const { getByText, getByTestId } = RenderWithRouter(
      <Pokedex pokemons={Data} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );

    Data.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();

      const buttonNext = getByTestId('next-pokemon');
      expect(buttonNext).toBeInTheDocument();
      fireEvent.click(buttonNext);
    });

    const namePokemon1 = getByText(/Pikachu/i);
    expect(namePokemon1).toBeInTheDocument();
  });

  test('Econtrado apenas um Pokemon por vez', () => {
    const { getAllByTestId } = RenderWithRouter(
      <Pokedex pokemons={Data} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );

    const pokemonName = getAllByTestId('pokemon-name');
    expect(pokemonName.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    const { getByRole } = RenderWithRouter(
      <Pokedex pokemons={Data} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );

    const pokemonsTypes = [
      'All',
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    const pokemonsLengths = [9, 1, 2, 1, 1, 2, 1, 1];

    pokemonsTypes.forEach((buttonName, index) => {
      const button = getByRole('button', { name: buttonName });
      expect(button).toBeInTheDocument();

      fireEvent.click(button);
      const pokemonsType = Data.filter(
        (pokemon) => pokemon.type === buttonName,
      );

      pokemonsType.length === 0
        ? expect(Data.length).toBe(pokemonsLengths[index])
        : expect(pokemonsType.length).toBe(pokemonsLengths[index]);
    });
  });

  test('Funcionalidade dos filtros dos botões', () => {
    const { getByRole, getByTestId, getByText } = RenderWithRouter(
      <Pokedex pokemons={Data} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );

    const pokemonsTypes = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    pokemonsTypes.forEach((buttonName) => {
      const button = getByRole('button', { name: buttonName });
      expect(button).toBeInTheDocument();

      fireEvent.click(button);

      const pokemonsType = Data.filter(
        (pokemon) => pokemon.type === buttonName,
      );

      pokemonsType.forEach((pokemon) => {
        const namePokemon = getByText(pokemon.name);
        expect(namePokemon.textContent).toBe(pokemon.name);

        const buttonNext = getByTestId('next-pokemon');
        fireEvent.click(buttonNext);
      });
    });
  });

  test('O botão de Próximo pokémon deve ser desabilitado', () => {
    const { getByTestId, getByRole } = RenderWithRouter(
      <Pokedex pokemons={Data} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );

    const buttonNext = getByTestId('next-pokemon');
    const buttonElectric = getByRole('button', { name: 'Electric' });

    expect(buttonNext).toBeInTheDocument();
    fireEvent.click(buttonElectric);
    expect(buttonNext).toBeDisabled();
  });

  test('testando existência dos botões', () => {
    const { queryAllByTestId, getByText } = RenderWithRouter(<App />);

    const allButtons = queryAllByTestId('pokemon-type-button');
    const nextButton = getByText(/Próximo pokémon/i);
    
    expect(allButtons.length).toBeGreaterThan(0);
    allButtons.forEach(button => expect(button).toBeInTheDocument());
    expect(nextButton).toBeInTheDocument();
  })
});
