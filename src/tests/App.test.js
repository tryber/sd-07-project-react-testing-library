import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);

  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = renderWithRouter(<App />);

  expect(getByText(/Home/i)).toBeInTheDocument();
  expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
  expect(getByText(/About/i)).toBeInTheDocument();

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('navegating through the pages', () => {
  test('navigating from home to Favorite Pokémons ', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));

    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();

  });

  test('landing on a bad page shows error 404', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/some/bad/route' });

    const pageNotFound = getByText(/Page requested not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });

  test('navigating from home About ', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText(/About/i));
    expect(getByText(/About Pokédex/i)).toBeInTheDocument();

  });
});
