import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import data from '../data';

describe('Testes de component Favorite Pokemons', () => {
  test('Teste de mensagem caso não haja pokémons favorito', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const message = getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });

  test('Teste se há pokemons favoritados', () => {
    const favoritePokemon = [data[1]];
    const { getByText } = renderWithRouter(<FavoritePokemons
      pokemons={ favoritePokemon }
    />);

    const pokeCard = getByText(/Charmander/i);
    expect(pokeCard).toBeInTheDocument();
  });

  test('Teste se não há determinado pokemon favoritado', () => {
    const favoritePokemon = [data[0]];
    const { getByText, queryByText } = renderWithRouter(<FavoritePokemons
      pokemons={ favoritePokemon }
    />);

    const pokeCard = getByText(/Pikachu/i);
    expect(pokeCard).toBeInTheDocument();

    const pokeCardFalse = queryByText(/Caterpie/i);
    expect(pokeCardFalse).not.toBeInTheDocument();
  });
});
