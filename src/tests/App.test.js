import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(<MemoryRouter><App /></MemoryRouter>);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('testa a url para home "/"', () => {
  const history = createMemoryHistory();
  const { getByText } = render(<MemoryRouter history={ history }><App /></MemoryRouter>);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  const info = getByText(/Encountered pokémons/i);
  expect(info).toBeInTheDocument();
});
