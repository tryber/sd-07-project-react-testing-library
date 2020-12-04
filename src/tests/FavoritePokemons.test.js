import React from 'react';
import pokemons from '../data';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Testando o arquivo FavoritePokemons.js', () => {
  const favoritePokemons = [pokemons[0], pokemons[1]];
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFav = getByText(/No favorite pokemon found/i);
    expect(noFav).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ favoritePokemons } />,
    );
    const pikachu = getByText(/Pikachu/);
    const charmander = getByText(/Charmander/);
    expect(charmander).toBeInTheDocument();
    expect(pikachu).toBeInTheDocument();
  });

  it('Teste se Não é exibido nenhum card de pokémon não favoritado.', () => {
    const { queryByText } = renderWithRouter(
      <FavoritePokemons pokemons={ favoritePokemons } />,
    );
    const alakazam = queryByText('Alakazam');
    expect(alakazam).toBeNull();
  });
});
