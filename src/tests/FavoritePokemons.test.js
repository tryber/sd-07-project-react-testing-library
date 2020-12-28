
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

test('Page without favorites must have the message', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/favorites'] }>
      <App />
    </MemoryRouter>,
  );
  const noFavorites = getByText('No favorite pokemon found');
  expect(noFavorites).toBeInTheDocument();
});

test('All favorite pokémon should appear', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  fireEvent.click(getByText('More details'));
  fireEvent.click(getByText('Pokémon favoritado?'));
  fireEvent.click(getByText('Favorite Pokémons'));
  const fav = getByTestId('pokemon-name').textContent;
  expect(fav).toBe('Pikachu');
});

test('No selected pokemons shouldnt appear', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const fav = getByTestId('pokemon-name').textContent;
  expect(fav).not.toBe('Charmander');
});