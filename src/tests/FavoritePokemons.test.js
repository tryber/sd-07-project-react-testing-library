import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const two = 2;

test('`No favorite pokemon found` é exibida, se não tiver pokémons favoritos', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  fireEvent.click(getByText('Favorite Pokémons'));
  const notFound = getByText('No favorite pokemon found');
  expect(notFound).toBeInTheDocument();
});

test('Pokmenos favoritos são exibidos, se tiver pokémons favoritos', () => {
  const {
    getByText,
    getByLabelText,
    getByTestId,
    getAllByTestId,
  } = renderWithRouter(<App />);
  fireEvent.click(getByText('More details'));
  userEvent.click(getByLabelText('Pokémon favoritado?'));
  fireEvent.click(getByText('Home'));
  userEvent.click(getByTestId('next-pokemon'));
  fireEvent.click(getByText('More details'));
  userEvent.click(getByLabelText('Pokémon favoritado?'));
  fireEvent.click(getByText('Favorite Pokémons'));
  const favoritePokemon = getAllByTestId('pokemon-name');
  expect(favoritePokemon[0]).toBeInTheDocument();
  expect(favoritePokemon[1]).toBeInTheDocument();
  expect(favoritePokemon.length).toBe(two);
});

test('Nenhum card é exibido, se não tiver pokémons favoritos', () => {
  const {
    getByText,
    getByLabelText,
    getByTestId,
  } = renderWithRouter(<App />);
  fireEvent.click(getByText('More details'));
  userEvent.click(getByLabelText('Pokémon favoritado?'));
  fireEvent.click(getByText('Home'));
  userEvent.click(getByTestId('next-pokemon'));
  fireEvent.click(getByText('More details'));
  userEvent.click(getByLabelText('Pokémon favoritado?'));
  fireEvent.click(getByText('Favorite Pokémons'));
  const notFound = getByText('No favorite pokemon found');
  expect(notFound).toBeInTheDocument();
});
