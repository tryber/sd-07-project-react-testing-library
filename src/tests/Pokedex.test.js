import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('testing Pokedex.js functionality', () => {
  it('Should have a h2 element', () => {
    renderWithRouter(<App />);

    const h2Element = document.querySelector('h2');
    expect(h2Element).toBeInTheDocument();
    expect(h2Element.tagName.toLowerCase()).toBe('h2');
    expect(h2Element.innerHTML).toBe('Encountered pokémons');
  });

  it('Should conteins next pokemon after clicking on next pokemon button', () => {
    const { getByText } = renderWithRouter(<App />);

    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const btnNextPokemon = getByText(/Próximo pokémon/i);
    expect(btnNextPokemon).toBeInTheDocument();
    pokemons.forEach((pokemon) => {
      const pokeName = getByText(pokemon.name);
      expect(pokeName).toBeInTheDocument();
      fireEvent.click(btnNextPokemon);
    });
    fireEvent.click(btnNextPokemon);
    expect(pikachu).toBeInTheDocument();
  });

  it('Should show only one pokemon per time', () => {
    renderWithRouter(<App />);

    const divCurrentPokemon = document.querySelectorAll('.pokemon');
    const numberToComper = 1;
    expect(divCurrentPokemon.length).toBe(numberToComper);
  });

  it('Should show only pokemons of type chossed', () => {
    const { getByText } = renderWithRouter(<App />);

    const selectedTypeBtn = getByText(/Fire/i);
    expect(selectedTypeBtn).toBeInTheDocument();
    fireEvent.click(selectedTypeBtn);
    const charmander = getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
    const btnNextPokemon = getByText(/Próximo pokémon/i);
    fireEvent.click(btnNextPokemon);
    const rapidash = getByText(/Rapidash/i);
    expect(rapidash).toBeInTheDocument();
  });

  it('Should show a button with text all to remove filter', () => {
    const { getByText } = renderWithRouter(<App />);

    const selectedTypeBtn = getByText(/Fire/i);
    expect(selectedTypeBtn).toBeInTheDocument();
    fireEvent.click(selectedTypeBtn);
    const charmander = getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
    const btnAll = getByText(/All/i);
    fireEvent.click(btnAll);
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const btnNextPokemon = getByText(/Próximo pokémon/i);
    pokemons.forEach((pokemon) => {
      const pokeName = getByText(pokemon.name);
      expect(pokeName).toBeInTheDocument();
      fireEvent.click(btnNextPokemon);
    });
  });

  it('Should have one button for each type of pokemon', () => {
    const { getByText, queryAllByTestId, container } = renderWithRouter(<App />);

    const btnsType = queryAllByTestId('pokemon-type-button');
    btnsType.forEach((btn) => {
      pokemons.forEach((pokemon) => {
        const btnAll = getByText(/all/i);
        expect(btnAll).toBeInTheDocument();
        if (pokemon.type === btn.innerHTML) {
          expect(btn.innerHTML).toEqual(pokemon.type);
        }
      });
    });
    const btnDateTestId = container.querySelector('[data-testid="pokemon-type-button"]');
    expect(btnDateTestId).toBeInTheDocument();
  });

  it('Should Next pokemon btn be disabled if theres only one pokemon of that type',
    () => {
      const { queryAllByText, getByTestId } = renderWithRouter(<App />);

      const electricBtn = queryAllByText(/Electric/i);
      fireEvent.click(electricBtn[1]);
      const nextPokemonBtn = getByTestId('next-pokemon');
      expect(nextPokemonBtn).toBeDisabled();
    });
});
