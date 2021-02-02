import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test("pokedex's main page is rendered when loading the application in the URL path '/'", () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('top of the application contains a fixed set of navigation links', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText(/Home/i)).toBeInTheDocument();
});

test('top of the application contains a fixed set of navigation links', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText(/About/i)).toBeInTheDocument();
});

test('top of the application contains a fixed set of navigation links', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
});

test("application is redirected to the home page, at the URL '/' by clicking on the Home link in the navigation bar", () => {
  const { getByText, history } = renderWithRouter(<App />)
  fireEvent.click(getByText(/Home/i));
  const { pathname } = history.location;

  expect(pathname).toBe('/');
});

test("application is redirected to the About page, in the URL '/about', by clicking on the About link in the navigation bar", () => {
  const { getByText, history } = renderWithRouter(<App />)
  fireEvent.click(getByText(/About/i));
  const { pathname } = history.location;

  expect(pathname).toBe('/about');
});

test("application is redirected to the Favorite Pokémon page, at the URL '/favorites', by clicking on the Favorite Pokémons link in the navigation bar", () => {
  const { getByText, history } = renderWithRouter(<App />)
  fireEvent.click(getByText(/Favorite Pokémons/i));
  const { pathname } = history.location;

  expect(pathname).toBe('/favorites');
});

test('application is redirected to the Not Found page when entering an unknown URL', () => {
  const { getByText, history } = renderWithRouter(<App />)
  history.push('/notFound')
 
  expect(getByText(/Page requested not found/i)).toBeInTheDocument();
});