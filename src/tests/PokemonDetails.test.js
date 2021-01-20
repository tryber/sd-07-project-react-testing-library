import React from 'react';
import { fireEvent } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import { PokemonDetails } from '../components';
import pokemons from '../data';

describe('Test7 -  PokemonDetails.js', () => {
  const pokemonPikachu = pokemons[0];
  const { name, summary } = pokemonPikachu;

  it('test if contain detalied information about selected pokemon', () => {
    const { getByText, queryByRole, getByRole } = RenderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ { 25: true } }
      match={ { params: { id: '25' } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => {} }
    />);
    expect(getByText(`${name} Details`)).toBeInTheDocument();
    expect(queryByRole('link')).not.toBeInTheDocument();
    expect(getByRole('heading', { name: 'Summary' })).toBeInTheDocument();
    expect(getByText(summary)).toBeInTheDocument();
  });

  it(' should be the page contain map section with maps and pokemon locations', () => {
    const {
      getByText,
      getAllByAltText,
      getByRole,
    } = RenderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ { 25: true } }
      match={ { params: { id: '25' } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => {} }
    />);
    expect(getByRole('heading', { name: `Game Locations of ${name}` }))
      .toBeInTheDocument();
    expect(getByText('Kanto Viridian Forest')).toBeInTheDocument();
    expect(getAllByAltText(`${name} location`)[1]).toHaveAttribute(
      'src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
  });

  it('test if user to favorite pokemon on details pages', () => {
    const {
      getByLabelText,
      getByRole,
    } = RenderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ { 25: true } }
      match={ { params: { id: '25' } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => {} }
    />);
    const favoritePokemonCheckbox = getByRole('checkbox');
    expect(getByRole('checkbox')).toBeInTheDocument();
    expect(getByRole('checkbox')).toBeChecked();
    fireEvent.change(
      favoritePokemonCheckbox, { target: { checked: false } },
    );
    expect(favoritePokemonCheckbox).not.toBeChecked();
    expect(getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
  });
});
