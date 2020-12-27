import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

test('Show the message No favorite pokemon found', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});

test('Show all favorites pokemons cards', () => {
  const { history, getByText, getByRole } = renderWithRouter(<App />);
  history.push('/pokemons/25');
  const checks = getByRole('checkbox');
  fireEvent.click(checks);
  expect(checks.checked).toEqual(true);
  history.push('/favorites');
  const poke = getByText('Pikachu');
  expect(poke).toHaveTextContent('Pikachu');
  expect(poke).toBeInTheDocument();
});

test('Should not show the not favorites pokémons', () => {
  const { getByRole, history, getByText } = renderWithRouter(<App />);
  history.push('/pokemons/151');
  const checks = getByRole('checkbox');
  expect(checks.checked).toEqual(false);
  const notPoke = getByText('Mew');
  history.push('/favorites');
  expect(notPoke).not.toBeInTheDocument();
});
