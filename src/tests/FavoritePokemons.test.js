import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testando o arquivo FavoritePokemons.js', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const favorites = [];
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ favorites } />);
    const information = getByText('No favorite pokemon found');
    expect(information).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const limitInf = 0;
    const limitSup = 3;
    const FavoritePokemon = pokemons.slice(limitInf, limitSup);
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ FavoritePokemon } />,
    );
    const favorites = getAllByTestId('favorite-pokemon');
    expect(favorites).toHaveLength(FavoritePokemon.length);
  });
  test('Teste se nenhum card de pokémon é exibido, se ele não favoritado.', () => {
    const favorites = [];
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ favorites } />);
    const information = getByText('No favorite pokemon found');
    expect(information).toBeInTheDocument();
  });
});
