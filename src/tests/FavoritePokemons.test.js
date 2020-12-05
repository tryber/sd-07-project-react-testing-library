import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

test('se existe uma mensagem caso a pessoa não tenha favoritos', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const message = getByText(/No favorite pokemon found/i);
  expect(message).toBeInTheDocument();
});

test('se é exibido os cards de Pokemons Favoritados', () => {
  const { getByText, getByLabelText } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More details/i));
  fireEvent.click(getByLabelText(/Pokémon favoritado?/i));
  fireEvent.click(getByText(/Favorite Pokémons/i));
  expect(getByText(/Pikachu/i)).toBeInTheDocument();
  fireEvent.click(getByText(/More details/i));
  fireEvent.click(getByLabelText(/Pokémon favoritado?/i));
  fireEvent.click(getByText(/Favorite Pokémons/i));
  expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
});
