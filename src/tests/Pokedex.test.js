import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import RenderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import data from '../data';

describe('Testing the Pokedex.js file', () => {
  const favoriteList = {
    25: true,
    10: false,
  };
  it('if the page contains a heading `h2` with the text`Encountered pokémons`', () => {
    const { getByText } = RenderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ favoriteList } />,
    );
    const subtitle = getByText(/Encountered pokémons/i);
    expect(subtitle.tagName).toBe('H2');
    expect(subtitle).toBeInTheDocument();
  });
  it('if next Pokémon is displayed when the`Próximo pokémon`button is clicked', () => {
    // eslint-disable-next-line no-unused-vars
    const { getByTestId } = RenderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ favoriteList } />,
    );
    const next = screen.getByTestId('next-pokemon');
    fireEvent.click(next);
    expect(next).toBeInTheDocument();
  });
  it('Test if only one Pokémon is shown at a time', () => {
    const { getAllByTestId, getByTestId } = RenderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ favoriteList } />,
    );
    const btNext = getByTestId('next-pokemon');
    const pokName = getAllByTestId('pokemon-name');
    fireEvent.click(btNext);
    expect(pokName).toHaveLength(1);
    expect(pokName[0]).toBeInTheDocument();
  });
  it('Test if Pokédex has the filter buttons', () => {
    const { getAllByTestId, getByText, getAllByText } = RenderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ favoriteList } />,
    );
    const btFilter = getAllByTestId('pokemon-type-button');
    const length = 7;
    expect(btFilter).toHaveLength(length);
    const btPsychic = getByText('Psychic');
    fireEvent.click(btPsychic);
    const btType = getAllByText(/Psychic/);
    const two = 2;
    expect(btType.length).toBe(two);
  });
  it('If the Pokédex contains a button to reset the filter', () => {
    const { getByText } = RenderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ favoriteList } />,
    );
    const btAll = getByText('All');
    fireEvent.click(btAll);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(btAll.tagName).toBe('BUTTON');
    expect(btAll).toBeInTheDocument();
  });
  it('Next Pokémon button should be disabled when has only one Pokémon', () => {
    const { getAllByRole, getByRole } = RenderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ favoriteList } />,
    );
    const btPokemon = getAllByRole('button', { name: 'Dragon' });
    const btNext = getByRole('button', { name: 'Próximo pokémon' });
    fireEvent.click(btPokemon[0]);
    expect(btPokemon).toHaveLength(1);
    expect(btNext.disabled).toBe(true);
  });
});
