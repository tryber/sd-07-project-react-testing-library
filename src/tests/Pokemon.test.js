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
    const srcExpected = 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png';
    expect(screen.getByRole('img', { name: /charmander sprite/i }).src).toBe(srcExpected);
  });
  test('Teste se o card do Pokémon contém um link para exibir detalhes deste Pokémon',
    () => {
      renderWithRouter(<Pokemon pokemon={ pokemons[1] } isFavorite={ false } />);
      expect(screen.getByText(/more details/i).href).toBe('http://localhost/pokemons/4');
    });
});
