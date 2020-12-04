import React from 'react';
import { fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// Teste se é exibido na tela a mensagem No favorite pokemon found,
// se a pessoa não tiver pokémons favoritos.
test('if message appears on screen', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const favorite = getByText(/No favorite pokemon found/i);
  expect(favorite).toBeInTheDocument();
});

// Teste se é exibido todos os cards de pokémons favoritados.
test('if favorite pokemons appear on screen', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/more details/i));
  fireEvent.click(getByText(/Pokémon favoritado?/i));
  history.push('/pokemons/4'); // pra trocar de rota
  fireEvent.click(getByText(/Pokémon favoritado?/i));
  history.push('/favorites');
  const pikachu = getByText(/pikachu/i);
  const char = getByText(/charmander/i);

  expect(pikachu).toBeInTheDocument();
  expect(char).toBeInTheDocument();
});

// Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.
test('if favorites show no pokemons', () => {
  const zero = 0;
  const { container } = renderWithRouter(<FavoritePokemons />);
  const favorite = container.getElementsByClassName('pokemon');
  expect(favorite.length).toBe(zero);
});
