import React from 'react';
import { screen } from '@testing-library/react';

import FavoritePokemons from '../components/FavoritePokemons';

import renderWithRouter from './renderWithRouter';
import favoritePokemonsData from './__mocks__/favoritePokemons';

describe('3. Testando o arquivo FavoritePokemons.js', () => {
  it(
    'Teste se é exibido na tela a mensagem No favorite pokemon found,'
    + 'caso a pessoa não tenha pokémons favoritos.', () => {
      const noFavoritePokemons = [];
      renderWithRouter(<FavoritePokemons pokemons={ noFavoritePokemons } />);

      const notFoundMessage = screen.getByText(/no favorite pokemon found/i);

      expect(notFoundMessage).toBeInTheDocument();
    },
  );

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemonsData } />);
    const notFoundMessage = screen.queryByText(/no favorite pokemon found/i);
    const favoritePokemon1 = screen.getByRole(
      'img', { name: /pikachu is marked as favorite/i },
    );
    const favoritePokemon2 = screen.getByRole(
      'img', { name: /charmander is marked as favorite/i },
    );

    expect(notFoundMessage).not.toBeInTheDocument();
    expect(favoritePokemon1).toBeInTheDocument();
    expect(favoritePokemon2).toBeInTheDocument();
  });

  it('Teste se Não é exibido nenhum card de pokémon não favoritado.', () => {
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemonsData } />);

    const favoritePokemon1 = screen.getByRole(
      'img', { name: /pikachu is marked as favorite/i },
    );
    const favoritePokemon2 = screen.getByRole(
      'img', { name: /charmander is marked as favorite/i },
    );
    const nonFavoritePokemon = screen.queryByRole(
      'img', { name: /caterpie is marked as favorite/i },
    );

    expect(favoritePokemon1).toBeInTheDocument();
    expect(favoritePokemon2).toBeInTheDocument();
    expect(nonFavoritePokemon).not.toBeInTheDocument();
  });
});
