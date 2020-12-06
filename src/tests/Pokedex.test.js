import React from 'react';
import { cleanup } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import Pokedex from '../components/Pokedex';
import Data from '../data';

afterEach(cleanup);

describe('EX05 - Testando o arquivo Pokedex.js', () => {
  test('heading h2 com o texto Encountered pokémons', () => {
    const { getByText } = RenderWithRouter(<Pokedex pokemons={ Data } isPokemonFavoriteById={{}} />);

    const subtitle = getByText(/Encountered pokémons/i);

    expect(subtitle.tagName).toBe('H2');
    expect(subtitle).toBeInTheDocument();
  })
});
