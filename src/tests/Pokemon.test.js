import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('se é renderizado um card com as informações de um pokemon', () => {
  const {
    getByText,
    getAllByText,
    getByAltText,
    getByTestId,
  } = renderWithRouter(<App />);
  const type = getByTestId('pokemonType');
  expect(type).toBeInTheDocument();
  expect(type.innerHTML).toBe('Electric');
  expect(getByText(/Pikachu/i)).toBeInTheDocument();
  expect(getAllByText(/Electric/i)[0]).toBeInTheDocument();
  expect(getByText(/Average weight: 6.0 kg/i)).toBeInTheDocument();
  expect(getByAltText(/Pikachu sprite/i)).toBeInTheDocument();
  const img = document.querySelector('img');
  expect(img.src).toBe(
    'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  );
});

test('se o card indicado possui um link para Detalhes', () => {
  const { getByText, history } = renderWithRouter(<App />);
  expect(getByText(/More details/i)).toBeInTheDocument();
  fireEvent.click(getByText(/More details/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

test('se existe um ícone de estrela nos pokemons favoritados', () => {
  const { getByAltText, getByText } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More details/i));
  fireEvent.click(getByText(/Pokémon favoritado?/i));
  fireEvent.click(getByText(/Home/i));

  expect(getByAltText(/Pikachu is marked as favorite/i)).toBeInTheDocument();
  const img = document.querySelectorAll('img')[1];
  expect(img.src).toBe('http://localhost/star-icon.svg');
});
