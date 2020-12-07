import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

describe('Testando component FavoritePokemons.', () => {
  it('Exibido na tela a mensagem `No favorite pokemon found`', () => {
    const { getByText } = renderWithRouter(<App />);
    const favorites = getByText(/Favorite pokémons/i);
    fireEvent.click(favorites);
    const pageText = getByText(/No favorite pokemon found/i);
    expect(pageText).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetails = getByText(/more details/i);
    fireEvent.click(moreDetails);
    const favPokemon = getByText(/pokémon favoritado/i);
    fireEvent.click(favPokemon);
    const favorites = getByText(/Favorite pokémons/i);
    fireEvent.click(favorites);
    const pikachu = getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
