import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('3 - Testando o arquivo FavoritePokemons.js', () => {
  test(`3.1 - Teste se é exibido na tela a mensagem No favorite pokemon found,
  se a pessoa não tiver pokémons favoritos.`, () => {
    const favorites = [];
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ favorites } />);
    const information = getByText('No favorite pokemon found');
    expect(information).toBeInTheDocument();
  });
  it('3.2 - Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const limitInf = 0;
    const limitSup = 3;
    const FavoritePokemon = pokemons.slice(limitInf, limitSup);
    const { container } = renderWithRouter(
      <FavoritePokemons pokemons={ FavoritePokemon } />,
    );
    const cards = container.getElementsByClassName('pokemon');
    expect(cards).toHaveLength(FavoritePokemon.length);
  });
  test('3.3 - Teste se nenhum card de pokémon é exibido, se ele não favoritado.', () => {
    const favorites = [];
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ favorites } />);
    const information = getByText('No favorite pokemon found');
    expect(information).toBeInTheDocument();
  });
});
