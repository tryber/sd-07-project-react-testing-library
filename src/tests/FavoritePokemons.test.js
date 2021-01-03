import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('Testando o arquivo FavoritePokemons.js', () => {
  it('é exibido uma mensagem se a pessoa não tem pokémons favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavoritePokemons = getByText('No favorite pokemon found');

    expect(noFavoritePokemons).toBeInTheDocument();
  });

  it('testa se aparece corretamente os pokemons favoritos', () => {
    const favoritePokemon = [pokemons[0], pokemons[1]];
    const {
      getByText,
      queryByText,
    } = renderWithRouter(<FavoritePokemons pokemons={ favoritePokemon } />);
    const pikachu = getByText('Pikachu');
    const charmander = getByText('Charmander');

    expect(pikachu).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
    expect(queryByText('Alakazam')).not.toBeInTheDocument();
  });
});
