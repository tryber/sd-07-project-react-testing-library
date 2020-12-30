import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
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

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('shows all 3 links', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('About')).toBeInTheDocument();
  expect(getByText('Favorite Pokémons')).toBeInTheDocument();
});

test('clicking on home link, goes to route `/`', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
    );
  // console.log(history.location)
  fireEvent.click(getByText('Home'));

  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('clicking on about link, goes to route `/about`', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
    );
  // console.log(history.location)
  fireEvent.click(getByText('About'));

  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('clicking on Favorite Pokémons link, goes to route `/favorites`', () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>
    );
  // console.log(history.location)
  fireEvent.click(getByText('Favorite Pokémons'));

  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('goes to not found page when the route is unknow', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/teste'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Page requested not found')).toBeInTheDocument();
});
