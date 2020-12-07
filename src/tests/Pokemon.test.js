import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('if the card rendering was correct', () => {
  const { getByTestId, getByRole } = renderWithRouter(<App />);
  const pkmnName = getByTestId('pokemon-name');
  const pkmnType = getByTestId('pokemonType');
  const pkmnWeigth = getByTestId('pokemon-weight');
  const pkmnSprite = getByRole('img');
  expect(pkmnName.innerHTML).toBe('Pikachu');
  expect(pkmnType.innerHTML).toBe('Electric');
  expect(pkmnWeigth.innerHTML).toBe('Average weight: 6.0 kg');
  expect(pkmnSprite).toHaveAttribute(
    'src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  );
  expect(pkmnSprite).toHaveAttribute(
    'alt', 'Pikachu sprite',
  );
});

test('if link to details exist', () => {
  const { getByText } = renderWithRouter(<App />);
  const detailsLink = getByText(/more details/i);
  expect(detailsLink).toBeInTheDocument();
  expect(detailsLink).toHaveAttribute(
    'href', '/pokemons/25',
  );
});

test('if link to details is functional', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const detailsButton = getByText(/more details/i);
  userEvent.click(detailsButton);
  expect(history.location.pathname).toBe('/pokemons/25');
});

test('if star icon appear on favorite pokemons', () => {
  const { getByText, getByAltText } = renderWithRouter(<App />);
  const detailsButton = getByText(/more details/i);
  userEvent.click(detailsButton);
  const favoriteButton = getByText(/pokémon favoritado/i);
  userEvent.click(favoriteButton);
  const starIcon = getByAltText(/pikachu is marked as favorite/i);
  expect(starIcon).toBeInTheDocument();
  expect(starIcon).toHaveAttribute(
    'src', '/star-icon.svg',
  );
});
