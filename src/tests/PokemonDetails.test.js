import React from 'react';
import { fireEvent, getAllByText, getByAltText, getByLabelText } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

describe('testing pokemon details', () => {
  test('details info', () => {
    const { getByText, queryByRole, getByRole } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { 25: true } }
        match={ { params: { id: '25' } } }
        onUpdateFavoritePokemons={ () => {} }
        pokemons={ pokemons }
      />,
    );

    expect(getByText(`${pokemons[0].name} ` + `Details`)).toBeInTheDocument();

    const detailLink = queryByRole('link', { name: 'More details' });
    expect(detailLink).toBeNull();

    const heading = getByRole('heading', { name: 'Summary', level: 2 });
    expect(heading).toBeInTheDocument();

    expect(getByText(pokemons[0].summary)).toBeInTheDocument();
  });

  test('location maps', () => {
    const { getByText, getAllByAltText} = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { 25: true } }
        match={ { params: { id: '25' } } }
        onUpdateFavoritePokemons={ () => {} }
        pokemons={ pokemons }
      />,
    );

      expect(getByText(`Game Locations of ` + `${pokemons[0].name}`)).toBeInTheDocument();

      const map = getAllByAltText(`${pokemons[0].name} ` + `location`);
      const mapLength = 2;
      expect(map.length).toBe(mapLength);
      expect(map[0].src)
        .toBe(pokemons[0].foundAt[0].map);
      expect(map[1].src)
        .toBe(pokemons[0].foundAt[1].map);
  });

  test('favorite a pokemon', () => {
    const { getByLabelText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { 25: true } }
        match={ { params: { id: '25' } } }
        onUpdateFavoritePokemons={ () => {} }
        pokemons={ pokemons }
      />,
    );

    const favoritePokemon = getByLabelText(/Pokémon favoritado?/i);
    expect(favoritePokemon).toBeInTheDocument();
    expect(favoritePokemon.checked).toBe(true);

    fireEvent.change(favoritePokemon, { target: { checked: false } });
    expect(favoritePokemon.checked).toBe(false);
  });
});
