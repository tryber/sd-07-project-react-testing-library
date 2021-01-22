import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import TestingRouter from '../components/TestingRouter';
import pokemons from '../data';
import { PokemonDetails } from '../components';

afterEach(cleanup);

describe('seventh requirement', () => {
  it('should render detailed informations of a given pokémon', () => {
    const { getByText, queryByText } = TestingRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { 25: true } }
        match={ { params: { id: '25' } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const pokemonName = getByText('Pikachu Details');
    const link = queryByText('More Details');
    const summary = getByText('Summary');
    const paragraph = getByText(`${pokemons[0].summary}`);

    expect(paragraph).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();
    expect(pokemonName).toBeInTheDocument();
  });
  it('should render maps section', () => {
    const { getByText, queryByText, getAllByAltText } = TestingRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { 25: true } }
        match={ { params: { id: '25' } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const title = getByText('Game Locations of Pikachu');
    const images = getAllByAltText('Pikachu location');
    pokemons[0]
      .foundAt
      .forEach(({ location, map }, index) => {
        expect(queryByText(location)).toBeInTheDocument();
        expect(images[index].src).toBe(map);
      });

    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H2');
  });

  it('should be possible to favorite the pokemon in detail page', () => {
    const { getByLabelText } = TestingRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { 25: true } }
        match={ { params: { id: '25' } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const checkBox = getByLabelText('Pokémon favoritado?');
    expect(checkBox).toBeInTheDocument();
    fireEvent.change(checkBox, { target: { checked: true } });
    expect(checkBox).toBeChecked();
  });
});
