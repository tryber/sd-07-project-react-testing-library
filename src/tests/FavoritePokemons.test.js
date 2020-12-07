import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o arquivo FavoritePokemons.js', () => {
  it(`Teste se é exibido na tela a mensagem No favorite pokemon found, 
  se a pessoa não tiver pokémons favoritos.`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/favorites/');
    const p = getByText(/No favorite pokemon found/);
    expect(p).toBeInTheDocument();
  });
});

describe('Testando o arquivo FavoritePokemons.js', () => {
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const favorite = getByText(/Pokémon favoritado/);
    fireEvent.click(favorite);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const weight = getByText(/Average weight: 6.0 kg/);
    expect(weight).toBeInTheDocument();
  });
});
