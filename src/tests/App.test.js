import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

it('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

it('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

it('The first link must have the text "Home"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText(/Home/i)).toBeInTheDocument();
});

it('The first link must have the text "About"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText(/About/i)).toBeInTheDocument();
});

it('The first link must have the text "Favorite Pokémons"', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(getByText(/Favorite Pokémons/i)).toBeInTheDocument();
});

it('Test if the application is redirected to the home page', () => {
  const history = createMemoryHistory();
  const route = '/';
  history.push(route);
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
});

it('Test if the application is redirected to the About page', () => {
  const history = createMemoryHistory();
  const route = '/about';
  history.push(route);
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  expect(screen.getByText(/About Pokédex/i)).toBeInTheDocument();
});
