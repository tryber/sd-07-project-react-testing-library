import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test("is displayed on the screen 'No favorite pokemon'", () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const favoritePokemonsButton = getByText('Favorite Pokémons');
  fireEvent.click(favoritePokemonsButton);

  const noFavoriteText = getByText('No favorite pokemon found');
  expect(noFavoriteText).toBeInTheDocument();
});
