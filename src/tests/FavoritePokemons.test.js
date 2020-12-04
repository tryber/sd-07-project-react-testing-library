import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
  it('existe no documento?', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const errorMsg = getByText('No favorite pokemon found');
    expect(errorMsg).toBeInTheDocument();
  });
});

describe('Teste se é exibido todos os cards de pokémons favoritados.', () => {
  it('O pokemon favoritado aparece?', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ [pokemons[0]] } />,
    );
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});

describe('Teste se nenhum card de pokémon é exibido, caso não for favoritado.', () => {
  it('O pokemon favoritado aparece?', () => {
    const { queryByText } = renderWithRouter(
      <FavoritePokemons />,
    );
    const pikachu = queryByText(/Average weight/);
    expect(pikachu).not.toBeInTheDocument();
  });
});
