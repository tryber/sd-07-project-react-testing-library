import React from 'react';
import { fireEvent, getByRole } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';
import Pokedex from '../components/Pokedex';

describe('Pokedéx Tests', () => {
  it('Tests if an H2 with especific text is rendered', () => {
    const { getByRole, history, getByText } = renderWithRouter(<App />);
    history.push('/');
    const heading = getByRole('heading', {name: /Encountered pokémons/i});
    expect(heading).toBeInTheDocument();
  });

  it('Tests if "next pokemon" button has functionality', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/');
    const pokedexBtn = document.querySelector('.pokedex-button');
    expect(pokedexBtn.textContent).toBe('Próximo pokémon');
    expect(pokedexBtn).toBeInTheDocument();
    const currentPoke = getByTestId(/pokemon-name/i).textContent;
    expect(currentPoke).toBe('Pikachu');
    fireEvent.click(pokedexBtn);
    const nextPoke = getByTestId(/pokemon-name/i).textContent;
    expect(nextPoke).toBe('Charmander');
  });

  it('Tests if only 1 pokemnon is shown at a time', () => {
    const { history, getAllByTestId } = renderWithRouter(<App />);
    history.push('/');
    const currentPoke = getAllByTestId(/pokemon-name/i);
    expect(currentPoke.length).toBe(1);
  });

  it('Tests if pokemnon filter buttons are rendered', () => {
    const { history, getByTestId } = renderWithRouter(<App />);
    history.push('/');
    const filterBtns = document.querySelectorAll('.filter-button');
    expect((filterBtns.length).toString()).toBe('8');
    const bugBtn = filterBtns[3];
    fireEvent.click(bugBtn);
    expect(bugBtn.textContent).toBe('Bug');
    const currentPoke = getByTestId(/pokemon-name/i).textContent;
    expect(currentPoke).toBe('Caterpie');
    const pokedexBtn = document.querySelector('.pokedex-button');
    fireEvent.click(pokedexBtn);
    expect(currentPoke).toBe('Caterpie');
  });

  it('Tests if an "ALL" button is rendered and resets the pokemon filter', () => {
    const { history, getByTestId } = renderWithRouter(<App />);
    history.push('/');
    const filterBtns = document.querySelectorAll('.filter-button');
    const clearBtn = filterBtns[0];
    expect(clearBtn.textContent).toBe('All');
    fireEvent.click(clearBtn);
    const currentPoke = getByTestId(/pokemon-name/i).textContent;
    expect(currentPoke).toBe('Pikachu');
    const pokedexBtn = document.querySelector('.pokedex-button');
    fireEvent.click(pokedexBtn);
    const nextPoke = getByTestId(/pokemon-name/i).textContent;
    expect(nextPoke).toBe('Charmander');
  });

  it('Tests if filter btns are redered dinamictly to each pokemon type', () => {
    const pokemonmocked = [pokemons[0], pokemons[1], pokemons[4], pokemons[7]];
    const favorites = {25: false, 4:false, 65: false, 143: false};
    const { getAllByTestId, getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemonmocked }
        isPokemonFavoriteById={ favorites }
      />
    );
    const filterBtns = getAllByTestId('pokemon-type-button')
    expect((filterBtns.length).toString()).toBe('4');
    expect(filterBtns[0].innerHTML).toBe('Electric');
    expect(filterBtns[1].innerHTML).toBe('Fire');
    expect(filterBtns[2].innerHTML).toBe('Psychic');
    expect(filterBtns[3].innerHTML).toBe('Normal');
    const all = getByRole('button', { name: /All/i });
    expect(all).toBeInTheDocument();
  });

  it('Tests if the "Proximo Pokemon" btn is disabled when desired', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const filterBtns = document.querySelectorAll('.filter-button');
    fireEvent.click(filterBtns[3]);
    const pokedexBtn = document.querySelector('.pokedex-button');
    expect(pokedexBtn.textContent).toBe('Próximo pokémon');
    expect(pokedexBtn.disabled).toBe(true);
  });
});
