import React from 'react';
import renderWithRouter from './renderWithRouter';
import { fireEvent } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const renderPokemon = ( pokemon, isFavorite) => {
  return renderWithRouter(
    <Pokemon
      pokemon={ pokemon }
      isFavorite={ isFavorite }
    />
  );
}

describe('should render a Pokémon', () => {
  it('should shown the pokémon name', () => {
    const { getByText } = renderPokemon( pokemons[2], false );
    const pokemon = getByText(/Caterpie/i);
    expect(pokemon).toBeInTheDocument();
  });

  it('should shown the pokémon type', () => {
    const { getByTestId } = renderPokemon( pokemons[2], false );
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toBeInTheDocument();
  });

  it('should shown the pokémon weight and measurement unit', () => {
    const { getByText } = renderPokemon( pokemons[2], false );
    const averageWeight = getByText(/Average weight: 2.9 kg/i);
    expect(averageWeight).toBeInTheDocument();
  });

  it('should render the pokémon image', () => {
    const { getByAltText } = renderPokemon( pokemons[2], false );
    const image = getByAltText('Caterpie sprite');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/8/83/Spr_5b_010.png');
  });
});

describe('should render a navigation link', () => {
  it('should have a navigation link to /pokemons/id', ()=> {
    const { getByText } = renderPokemon( pokemons[0], false );
    const link = getByText(/More details/i);
    expect(link.href).toBe('http://localhost/pokemons/25');
  });

  it('should redirect to /pokemons/id when clicked', () => {
    const { getByText, history } = renderPokemon( pokemons[0], false );
    const link = getByText(/More details/i);
    fireEvent.click(link);
    const pathname = history.location.pathname;
    expect(pathname).toBe('/pokemons/25');
  })
});

describe('should be possible to favor the pokémon', () => {
  it('should be favored with a star icon', () => {
    const { getByAltText } = renderPokemon( pokemons[8], true );
    const isFavorite = getByAltText(/Dragonair is marked as favorite/i);
    expect(isFavorite.src).toBe('http://localhost/star-icon.svg');
  })

  it('should have the alt text `Pokémon is marked as favorite`', () => {
    const { getByAltText } = renderPokemon( pokemons[8], true );
    const isFavorite = getByAltText(/Dragonair is marked as favorite/i);
    expect(isFavorite).toBeInTheDocument();
  })
})
