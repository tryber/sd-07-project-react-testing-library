import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
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

test('if the top of the application contains a fixed set of 3 navigation links', () => {
  const { getByText } = renderWithRouter(<App />);
  const linkHome = getByText(/Home/i);
  const linkAbout = getByText(/About/i);
  const linkFavorite = getByText(/Favorite Pokémons/i);
  expect(linkHome).toBeInTheDocument();
  expect(linkAbout).toBeInTheDocument();
  expect(linkFavorite).toBeInTheDocument();
});

test('the app is directed to the Innitial page click on the Home link', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkHome = getByText(/Home/i);

  fireEvent.click(linkHome);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('the app is directed to the About page click on the About link', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkAbout = getByText(/About/i);

  fireEvent.click(linkAbout);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('the app is directed to the Favorites page click on the Favorites link', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkFavorite = getByText(/Favorite Pokémons/i);

  fireEvent.click(linkFavorite);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('the app is taken to the Not Found page when entering an unknown URL', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const unknownURL = '/trybe';

  history.push(unknownURL);
  const notFound = getByText(/Page requested not found/i);
  expect(notFound).toBeInTheDocument();
});
