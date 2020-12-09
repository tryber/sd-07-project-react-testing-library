import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import App from '../App';
import Favorite from '../components/FavoritePokemons';

afterEach(cleanup);

describe('EX03 - Testando o arquivo FavoritePokemons.js', () => {
  test('mensagem "No favorite pokemon found", se não tiver pokémons favoritos', () => {
    const { getByText, container } = RenderWithRouter(<Favorite />);

    const favoritePokemon = container.getElementsByClassName('favorite-pokemon');
    const lengthPokemon = 0;

    if (favoritePokemon.length === lengthPokemon) {
      const messageNotFound = getByText(/No favorite pokemon found/i);
      expect(messageNotFound).toBeInTheDocument();
    }
  });

  test('exibido todos os cards de pokémons favoritados.', () => {
    const {
      getByTestId,
      getByText,
      getByLabelText,
      container,
    } = RenderWithRouter(<App />);

    const detailsPokemon = getByText('More details');
    fireEvent.click(detailsPokemon);

    const inputFavorite = getByLabelText('Pokémon favoritado?');
    fireEvent.click(inputFavorite);

    const linkHome = getByText('Home');
    fireEvent.click(linkHome);

    const buttonNext = getByTestId('next-pokemon');
    fireEvent.click(buttonNext);

    const detailsPokemon2 = getByText('More details');
    fireEvent.click(detailsPokemon2);

    const inputFavorite2 = getByLabelText('Pokémon favoritado?');
    fireEvent.click(inputFavorite2);

    const linkFavorite = getByText('Favorite Pokémons');
    fireEvent.click(linkFavorite);

    const favoritePokemons = container.getElementsByClassName('favorite-pokemon');
    const favoritePokemonsLength = 2;
    expect(favoritePokemons.length).toBe(favoritePokemonsLength);
  });
});
