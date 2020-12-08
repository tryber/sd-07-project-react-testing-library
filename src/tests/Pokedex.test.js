import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('testing file Pokedex.js', () => {
  afterEach(cleanup);

  it('Verifica se há uma tag h2 com o texto: Encountered Pokémon', () => {
    const { getByRole } = renderWithRouter(<App />);
    const textHeading = getByRole('heading', { name: /Encountered pokémons/ });
    expect(textHeading.tagName).toBe('H2');
  });

  it('Verifica se é exibe o próximo Pokémon da lista quando o botão é clicado', () => {
    const { getByText } = renderWithRouter(<App />);
    const pokemonsList = pokemons.map((element) => element.name);
    const nextPokemon = getByText(/Próximo pokémon/);
    pokemonsList.forEach((pokemon) => {
      expect(getByText(pokemon)).toBeInTheDocument();
      fireEvent.click(nextPokemon);
    });
    const firstPokemon = getByText(/Pikachu/);
    fireEvent.click(nextPokemon);
    expect(firstPokemon).toBeInTheDocument();
  });

  it('Verifica se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const onePokemonOnPage = getAllByTestId('pokemon-name');
    expect(onePokemonOnPage.length).toBe(1);
  });

  it('Verifica se a Pokédex tem os botões de filtro.', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const fireButton = getByText(/Fire/);

    fireEvent.click(fireButton);

    const firstFilter = getByText(/Charmander/);
    expect(firstFilter).toBeInTheDocument();

    const nextPokemon = getByText(/Próximo pokémon/);
    fireEvent.click(nextPokemon);

    const secondFilter = getByText(/Rapidash/);
    expect(secondFilter).toBeInTheDocument();
    fireEvent.click(nextPokemon);

    expect(firstFilter).toBeInTheDocument();
    const typePokemon = getByTestId('pokemonType');
    expect(typePokemon).toHaveTextContent(/Fire/);
  });

  it('Verifica se a Pokédex contém um botão para resetar filtro', () => {
    const { getByText, getByTestId, getByRole } = renderWithRouter(<App />);
    const allButton = getByRole('button', { name: /All/ });
    expect(allButton).toBeVisible();

    const pokemonsList = pokemons.map((element) => element.name);
    const nextPokemon = getByText(/Próximo pokémon/);
    pokemonsList.forEach((pokemon) => {
      expect(getByText(pokemon)).toBeVisible();
      fireEvent.click(nextPokemon);
    });

    const fireButton = getByText(/Fire/);
    fireEvent.click(fireButton);

    const firstFilter = getByText(/Charmander/);
    expect(firstFilter).toBeInTheDocument();
    fireEvent.click(nextPokemon);

    const secondFilter = getByText(/Rapidash/);
    expect(secondFilter).toBeInTheDocument();
    fireEvent.click(nextPokemon);

    expect(firstFilter).toBeInTheDocument();
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent(/Fire/);
    fireEvent.click(allButton);

    pokemonsList.forEach((pokemon) => {
      expect(getByText(pokemon)).toBeVisible();
      fireEvent.click(nextPokemon);
    });
  });

  it('Verifica se é gerado um botão filtrar para cada tipo de Pokémon.', () => {
    const { getByRole, getAllByTestId } = renderWithRouter(<App />);
    const pokemonTypes = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    const buttonsTypePokemon = getAllByTestId(/pokemon-type-button/);
    expect(buttonsTypePokemon.length).toEqual(pokemonTypes.length);

    const buttons = getByRole('button', { name: /All/ });
    expect(buttons).toBeVisible();
    expect(getByRole('button', { name: pokemonTypes[0] })).toBeVisible();
    expect(getByRole('button', { name: pokemonTypes[1] })).toBeVisible();
    expect(getByRole('button', { name: pokemonTypes[2] })).toBeVisible();
    expect(getByRole('button', { name: pokemonTypes[3] })).toBeVisible();
    expect(getByRole('button', { name: pokemonTypes[4] })).toBeVisible();
    expect(getByRole('button', { name: pokemonTypes[5] })).toBeVisible();
    expect(getByRole('button', { name: pokemonTypes[6] })).toBeVisible();
  });

  it('Btn Próximo pokémon deve ser desabilitado quando houver apenas um pokémon', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeVisible();

    const electricButton = getByRole('button', { name: /Electric/ });
    fireEvent.click(electricButton);
    const nextPokemon = getByRole('button', { name: /Próximo pokémon/ });
    expect(nextPokemon).toBeDisabled();
  });
});
