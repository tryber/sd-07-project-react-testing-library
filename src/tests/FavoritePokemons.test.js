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
});
