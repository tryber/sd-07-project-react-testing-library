import { cleanup } from '@testing-library/react';
import React from 'react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';

afterEach(cleanup);

describe('Pokedex - teste de Conteúdo', () => {
  it('Deve renderizar um h2 com o texto "Encountered pokémons"', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);
    const h2Element = getByRole('heading', { level: 2 });
    const h2Content = getByText('Encountered pokémons');
    expect(h2Element).toBeInTheDocument();
    expect(h2Content).toBeInTheDocument();
  });
});
