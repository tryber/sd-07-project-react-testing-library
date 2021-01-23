import React from 'react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import Pokemon from '../data';

describe('Testing the Pokedex.js file', () => {

  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {

    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemon }
      isPokemonFavoriteById={ { 25: false } }
    />);
    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
});

  test('Teste se é exibido o próximo Pokémon da lista', () => {

    const pokemon = [Pokemon[0]];
    const { getByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemon }
      isPokemonFavoriteById={ { 25: false } }
    />);
    expect(getByTestId('next-pokemon')).toHaveTextContent('Próximo pokémon');
});

  test('Teste se é mostrado apenas um Pokémon por vez', () => {

});
});
