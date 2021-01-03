import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { render } from '@testing-library/react';
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

// teste extraído de https://github.com/tryber/sd-07-project-react-testing-library/blob/ff0583e67652b58b80b2a5932d67279018fcc1ab/src/tests/App.test.js
// sobre MemoryRouter e initialEntries : https://reactrouter.com/web/api/MemoryRouter/initialentries-array