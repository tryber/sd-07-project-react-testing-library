import React from 'react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Testa o arquivo Pokedex.js', () => {
  it('testa se a página tem um h2 com o texto encoutered pokemons', () => {
    const pokemon = [pokemons[0]];
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ { 25: false } }
      />,
    );

    const heading = getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Encountered pokémons');
  });

  it('testa se é exibido o próximo pokemon quando clica no botão proximo pokemon', () => {
    const pokemon = [pokemons[0]];
    const { getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ { 25: false } }
      />,
    );

    const nextPokemonButton = getByTestId('next-pokemon');
    expect(nextPokemonButton).toBeInTheDocument();
  });
});
