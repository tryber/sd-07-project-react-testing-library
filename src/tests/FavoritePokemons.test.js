import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('the expected message is displayed, if the person does not have favorite.', () => {
  renderWithRouter(<App />);
  const favorite = screen.getByText(/Favorite Pokémons/i);
  fireEvent.click(favorite);
  const text = screen.getByText(/No favorite pokemon found/i);
  expect(text).toBeInTheDocument();
});

test('Test whether all favorite Pokémon cards are displayed.', () => {
  renderWithRouter(<App />);
  const btnDetails = screen.getByText(/More details/i);
  fireEvent.click(btnDetails);
  const btnFavorite = screen.getByText(/Pokémon favoritado/i);
  fireEvent.click(btnFavorite);
  const favorite = screen.getByText(/Favorite Pokémons/i);
  fireEvent.click(favorite);
  const pokemon = screen.getByTestId(/pokemon-name/i);
  expect(pokemon).toBeInTheDocument();
});
