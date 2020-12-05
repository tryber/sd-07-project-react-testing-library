import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const favorite = getByText(/Pokémon favoritado/);
    fireEvent.click(favorite);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const weight = getByText(/Average weight: 6.0 kg/);
    expect(weight).toBeInTheDocument();

  });
});
