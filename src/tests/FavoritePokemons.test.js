import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('if messae appears when there is no favorite pokémon', () => {
  const { getByText } = renderWithRouter(<App />);
  userEvent.click(getByText(/Favorite Pokémons/i));
  expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
});

test('if favorite Pokémons show up in the page', () => {
  const { getByText } = renderWithRouter(<App />);
  userEvent.click(getByText(/more details/i));
  userEvent.click(getByText(/favoritado/i));
  userEvent.click(getByText(/favorite pokémons/i));
  expect(getByText(/pikachu/i)).toBeInTheDocument();
});
