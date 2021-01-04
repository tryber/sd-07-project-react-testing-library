import React from 'react';
import { cleanup, screen, fireEvent } from '@testing-library/react';
import PokemonDetails from '../components/PokemonDetails';
import RenderWithRouter from './RenderWithRouter';
import data from '../data';

afterEach(cleanup);

const pokemon = data[6];
const Render = () => (
  RenderWithRouter(
  <PokemonDetails 
    pokemons={ [pokemon] }
    isPokemonFavoriteById={ { 78: false } }
    onUpdateFavoritePokemons={ () => {} }
    match={ { params: { id: '78' } } }
  />
)
);

test ('whether detailed information about the selected'
  + 'Pokémon is shown on the screen', () => {
    const { } = Render();
});