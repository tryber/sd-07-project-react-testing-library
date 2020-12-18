import React from 'react';
import { MemoryRouter } from 'react-router-dom';
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

  const subtitle = getByText(/Encountered pokémons/i);
  expect(subtitle).toBeInTheDocument();
});

test('if aplication top contains this links: "Home", "About", "Favorite Pokémons"',
  () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const head = getByText(/Home/i);
    const about = getByText(/About/i);
    const favoritePokemos = getByText(/Favorite Pokémons/i);

    expect(head).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemos).toBeInTheDocument();
  });
