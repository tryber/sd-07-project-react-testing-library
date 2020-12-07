import React from 'react';
import RenderWithRouter from './RenderWithRouter';
// import { fireEvent } from '@testing-library/react';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Test 6 - Pokemon.js', () => {
  it('', () => {
    const { getByTestId, getByRole } = RenderWithRouter(
      <App pokemons={ pokemons }>
        <Pokemon />
      </App>,
    );
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemonType');
    const pokemonWeight = getByTestId('pokemon-weight');
    const image = getByRole('img', { src: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png' });
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});
