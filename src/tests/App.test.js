import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const history = createMemoryHistory();
  const { getByText } = render(<Router history={ history }><App /></Router>);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows thePokedex when the route is `/`', () => {
  const history = createMemoryHistory();
  const { getByText } = render(<Router history={ history }><App /></Router>);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  const info = getByText(/Encountered pokémons/i);
  expect(info).toBeInTheDocument();
});
