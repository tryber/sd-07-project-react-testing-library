import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('details page structure', () => {
  const { queryByText } = renderWithRouter(<App />);
  const detailsButton = queryByText(/more details/i);
  userEvent.click(detailsButton);
  expect(queryByText(/pikachu details/i)).toBeInTheDocument();
  const detailsButtonOnDetailsPage = queryByText(/more details/i);
  expect(detailsButtonOnDetailsPage).toBeNull();
  expect(queryByText(/summary/i)).toBeInTheDocument();
  expect(queryByText(/this intelligent pokémon/i)).toBeInTheDocument();
});

test('if texts and locations images are present', () => {
  const { queryByText, queryAllByAltText } = renderWithRouter(<App />);
  userEvent.click(queryByText(/more details/i));
  const numberOfLocations = 2;
  const locationTag = queryByText(/game locations of pikachu/i);
  const locationsImgs = queryAllByAltText(/pikachu location/i);
  expect(locationTag).toBeInTheDocument();
  expect(locationsImgs.length).toEqual(numberOfLocations);
  expect(locationsImgs[0]).toHaveAttribute(
    'src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
  );
});

test('if its possible to favorite pkmn from details page', () => {
  const { queryByText } = renderWithRouter(<App />);
  userEvent.click(queryByText(/more details/i));
  expect(queryByText(/pokémon favoritado/i)).toBeInTheDocument();
});
