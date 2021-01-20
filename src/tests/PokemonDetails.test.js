import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import Pokedex from '../components/Pokedex';
import RenderWithRouter from './RenderWithRouter';
import pokemons from '../data';

describe('Test 7 - PokemonDetails.js', () => {
  it('Should show details about a especifc pokemon', () => {
    const { getByText } = RenderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } />
      </App>,
    );
    const moreDetails = getByText('More details');
    fireEvent.click(moreDetails);
    const pokeName = pokemons[0].name;
    expect(getByText(pokeName)).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    const heading = document.querySelectorAll('h2');
    expect(heading[1]).toBeInTheDocument();
    expect(heading[1].innerHTML).toBe('Summary');
    const description = 'This intelligent Pokémon roasts hard berries'
    + ' with electricity to make them tender enough to eat.';
    const paragraph = document.querySelectorAll('p');
    expect(paragraph[3].innerHTML).toBe(description);
  });
});
