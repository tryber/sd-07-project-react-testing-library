import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

describe('1. App.js file', () => {
  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('render initial page `/`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const title = getByText(/Pokédex/i);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
    expect(title).toBeInTheDocument();
  });

  test('test if there are a set of navigation links ', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    const about = getByText(/About/i);
    const fav = getByText(/Favorite Pokémons/i);

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(fav).toBeInTheDocument();
  });
  test('the page should redirected to about when clicked', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText(/About/i);

    fireEvent.click(about);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });
  test('the page should redirected to Pokémons Favoritados when clicked', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favorites = getByText(/Favorite Pokémons/i);

    fireEvent.click(favorites);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });
  test('the page should redirected to Not Found the URL is not unknown', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/unknownURL');

    const { pathname } = history.location;

    expect(pathname).toBe('/unknownURL');
    expect(getByText(/Page requested not fo/i)).toBeInTheDocument();
  });
});
