import { cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

afterEach(cleanup);

describe('Testando o arquivo FavoritePokemons.js', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkFavorite = getByText(/Favorite Pokémons/i);
    fireEvent.click(linkFavorite);
    const noFavoriteMsg = getByText(/No favorite pokemon found/i);
    expect(noFavoriteMsg).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const favoritesLink = getByText(/Favorite Pokémons/i);
    const moreDetailsLink = getByText(/More details/i);
    fireEvent.click(moreDetailsLink);
    const favorite = getByRole(/checkbox/i);
    fireEvent.click(favorite);
    fireEvent.click(favoritesLink);
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
