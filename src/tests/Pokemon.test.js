import React from 'react';
import { screen } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testando o arquivo Pokemon.js', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[1] } isFavorite={ false } />);
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent(/average weight: 8.5 kg/i);
  });
});
