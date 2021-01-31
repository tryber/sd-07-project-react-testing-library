import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Testing Pokedex.js', () => {
  it('Tests if the page contains a H2', () => {
    const { container } = renderWithRouter(<App />);
    const heading = container.querySelector('h2').innerHTML;
    expect(heading).toBe('Encountered pokémons');
  });
  it('Tests if the next pokemon button works', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextPokemonBtn = getByText('Próximo pokémon');
    expect(nextPokemonBtn).toBeInTheDocument();
    fireEvent.click(nextPokemonBtn);
    const charmander = getByText('Charmander');
    expect(charmander).toBeInTheDocument();
    const num0 = 0;
    const num7 = 7;
    for (let i = num0; i <= num7; i += 1) {
      fireEvent.click(nextPokemonBtn);
    }
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
  it('Tests if only one pokemons renders', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    const num0 = 0;
    const num8 = 8;
    for (let i = num0; i <= num8; i += 1) {
      const pokemonName = getAllByTestId('pokemon-name');
      fireEvent.click(getByText(/Próximo pokémon/i));
      expect(pokemonName.length).toBe(1);
    }
  });
  it('Tests the filters', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const filterPokemonsBtn = getAllByTestId('pokemon-type-button');
    fireEvent.click(filterPokemonsBtn[0]);
    const electricPokemons = getByTestId('pokemonType');
    expect(electricPokemons.innerHTML).toBe('Electric');
    fireEvent.click(filterPokemonsBtn[1]);
    const firePokemons = getByTestId('pokemonType');
    expect(firePokemons.innerHTML).toBe('Fire');
    fireEvent.click(filterPokemonsBtn[2]);
    const bugPokemons = getByTestId('pokemonType');
    expect(bugPokemons.innerHTML).toBe('Bug');
    fireEvent.click(filterPokemonsBtn[3]);
    const poisonPokemons = getByTestId('pokemonType');
    expect(poisonPokemons.innerHTML).toBe('Poison');
    fireEvent.click(filterPokemonsBtn[4]);
    const psychicPokemons = getByTestId('pokemonType');
    expect(psychicPokemons.innerHTML).toBe('Psychic');
    fireEvent.click(filterPokemonsBtn[5]);
    const normalPokemons = getByTestId('pokemonType');
    expect(normalPokemons.innerHTML).toBe('Normal');
    fireEvent.click(filterPokemonsBtn[6]);
    const dragonPokemons = getByTestId('pokemonType');
    expect(dragonPokemons.innerHTML).toBe('Dragon');
  });
  it('Tests the ALL button', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const allBtn = getByText('All');
    expect(allBtn).toBeInTheDocument();
    fireEvent.click(allBtn);
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    history.push('/');
    const pikachuSecondTime = getByText('Pikachu');
    expect(pikachuSecondTime).toBeInTheDocument();
  });
  it('Tests if ALL and types buttons exists', () => {
    const { getAllByTestId, getByRole } = renderWithRouter(<App />);
    const btnFilters = getAllByTestId('pokemon-type-button');
    btnFilters.forEach((tipo) => {
      const btn = getByRole('button', {
        name: tipo.innerHTML,
      });
      expect(btn).toBeInTheDocument();
    });
    const btnAll = getByRole('button', {
      name: 'All',
    });
    expect(btnAll).toBeInTheDocument();
  });
  it('Tests if a next pokemon button exists', () => {
    const { getAllByTestId, getByText } = renderWithRouter(<App />);
    const btnFilterByTypes = getAllByTestId('pokemon-type-button');
    fireEvent.click(btnFilterByTypes[0]);
    fireEvent.click(getByText('Próximo pokémon'));
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
