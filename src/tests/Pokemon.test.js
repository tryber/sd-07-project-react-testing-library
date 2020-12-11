import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a card with information about a specific pokémon', () => {
  const { getAllByRole, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokeName = getByTestId('pokemon-name');
  const pokeType = getByTestId('pokemonType');
  const pokeWeight = getByTestId('pokemon-weight');
  const pokeImg = getAllByRole('img')[0];

  expect(pokeName).toHaveTextContent('Pikachu');
  expect(pokeType).toHaveTextContent('Electric');
  expect(pokeWeight).toHaveTextContent('Average weight: 6.0 kg');
  expect(pokeImg.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(pokeImg.alt).toBe('Pikachu sprite');
});

test('More details button', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const moreDetails = getByText('More details');
  expect(moreDetails.href).toMatch((/\/pokemons\/25$/));
  fireEvent.click(moreDetails);
  expect(history.location.pathname).toBe('/pokemons/25');
});
test('', () => {
  const { getByText, getByLabelText, getAllByRole } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const moreDetails = getByText('More details');
  fireEvent.click(moreDetails);

  const isFavorite = getByLabelText('Pokémon favoritado?');
  fireEvent.click(isFavorite);

  const favoriteStar = getAllByRole('img')[1];

  expect(favoriteStar.src).toMatch(/\/star-icon.svg$/);
  expect(favoriteStar.alt).toBe('Pikachu is marked as favorite');
});
