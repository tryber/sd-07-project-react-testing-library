import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Detailed info about the selected Pokémon is shown on the screen', () => {
  const { getByText } = renderWithRouter(<App />);
  const pokemonDetail = getByText(/More details/i);
  fireEvent.click(pokemonDetail);
  const pokemon = getByText(/Pikachu Details/i);
  expect(pokemon).toBeInTheDocument();
  const h2Text = getByText(/Summary/i);
  expect(h2Text).toBeInTheDocument();
});
