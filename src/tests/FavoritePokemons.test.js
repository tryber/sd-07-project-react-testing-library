import React from 'react';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('Testando o arquivo FavoritePokemons.js', () => {
  it('exibe mensagem No favorite pokemon found, se não tiver pokémons favoritos.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavoritePokemons = getByText('No favorite pokemon found');

    expect(noFavoritePokemons).toBeInTheDocument();
  });

  it('exibe todos os cards de pokémons favoritados', () => {
    const favoritePokemon = [pokemons[0], pokemons[1]];
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ favoritePokemon } />,
    );
    const pikachu = getByText('Pikachu');
    const charmander = getByText('Charmander');

    expect(pikachu).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
  });

  it('não exibe todos os cards de pokémons favoritados', () => {
    const favoritePokemon = [pokemons[0], pokemons[1]];
    const { queryByText } = renderWithRouter(
      <FavoritePokemons pokemons={ favoritePokemon } />,
    );

    // Não testa exatamente se nenhum que não está favoritado aparece, refatorar.
    expect(queryByText('caterpie')).not.toBeInTheDocument();
  });
});
