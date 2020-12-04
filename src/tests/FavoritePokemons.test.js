import React from 'react';
import pokemons from '../data';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Testando o arquivo FavoritePokemons.js', () => {
  const favoritePokemons = [pokemons[0], pokemons[1]];

  test('Se é exibido a mensagem "No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavorite = getByText(/No favorite pokemon found/i);

    expect(noFavorite).toBeInTheDocument();
  });
  test('Se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ favoritePokemons } />,
    );
    const pikachu = getByText(/Pikachu/);
    const charmander = getByText(/Charmander/);
    expect(charmander).toBeInTheDocument();
    expect(pikachu).toBeInTheDocument();
  });
  test('Se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    const { queryByText } = renderWithRouter(
      <FavoritePokemons pokemons={ favoritePokemons } />,
    );
    const alakazam = queryByText('Alakazam');
    expect(alakazam).toBeNull();
  });
});
