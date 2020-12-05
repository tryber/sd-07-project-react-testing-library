import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

afterEach(cleanup);
test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('If it contains the links expected at the beginning', () => {
  renderWithRouter(<App />);
  const textHome = screen.getByText(/Home/i);
  const textAbout = screen.getByText(/About/i);
  const textFavorite = screen.getByText(/Favorite Pokémons/i);

  expect(textHome).toBeInTheDocument();
  expect(textAbout).toBeInTheDocument();
  expect(textFavorite).toBeInTheDocument();
});

test('Clicking the (Home) link takes you to the right route', () => {
  const { history } = renderWithRouter(<App />);
  const btnHome = screen.getByText(/Home/i);
  fireEvent.click(btnHome);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('click on the link (Favorite Pokémon), it will take you to the right path', () => {
  const { history } = renderWithRouter(<App />);
  const btnFovorite = screen.getByText(/Favorite Pokémons/i);
  fireEvent.click(btnFovorite);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('Clicking the (About) link takes you to the right route', () => {
  const { history } = renderWithRouter(<App />);
  const btnAbout = screen.getByText(/About/i);
  fireEvent.click(btnAbout);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('is redirected to the Not Found page when entering an unknown URL.', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/xablau');
  const textNotFound = screen.getByText(/Page requested not found/i);
  expect(textNotFound).toBeInTheDocument();
});
