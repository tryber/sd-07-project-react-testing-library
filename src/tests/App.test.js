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

test('Check if you render the `Home` link on the header page', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const linkHome = getByText(/Home/i);
  expect(linkHome).toBeInTheDocument();
});

test('Check if you render the `About` link on the header page', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const linkAbout = getByText(/About/i);
  expect(linkAbout).toBeInTheDocument();
});

test('Check if you render the `Favorite Pokémon` link on the header page', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const linkFavoritePokémons = getByText(/Favorite Pokémons/i);
  expect(linkFavoritePokémons).toBeInTheDocument();
});
