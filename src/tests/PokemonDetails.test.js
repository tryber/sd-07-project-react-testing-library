import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';
import TestingRouter from '../components/TestingRouter';

afterEach(cleanup);

describe('seventh requirement', () => {
  it('should render detail informations of a given Pokémon', () => {
    // referência: Alexandre Faustino
    const { getByText, queryByRole } = TestingRouter(<PokemonDetails
      isPokemonFavoriteById={ { 25: true } }
      match={ { params: { id: '25' } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => {} }
    />);
    expect(getByText('Pikachu Details')).toBeInTheDocument();
    expect(queryByRole('link')).not.toBeInTheDocument();
    expect((getByText('Summary')).tagName).toBe('H2');
    expect(getByText(pokemons[0].summary)).toBeInTheDocument();
  });
  it('should render map section', () => {
    const { getByText, getAllByAltText } = TestingRouter(<PokemonDetails
      isPokemonFavoriteById={ { 25: true } }
      match={ { params: { id: '25' } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => {} }
    />);
    const heading = getByText('Game Locations of Pikachu');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
    const maps = getAllByAltText('Pikachu location');
    const mapImages = pokemons[0].foundAt.map((image) => image.map);
    maps.forEach((map, index) => {
      expect(map).toBeInTheDocument();
      expect(map.src).toBe(mapImages[index]);
    });
  });
  it('should be possible to favorite the pokemon', () => {
    const { getByLabelText } = TestingRouter(<PokemonDetails
      isPokemonFavoriteById={ { 25: false } }
      match={ { params: { id: '25' } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => {} }
    />);
    const checkbox = getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
    fireEvent.change(checkbox, { target: { checked: true } });
    expect(checkbox).toBeChecked();
  });
});
