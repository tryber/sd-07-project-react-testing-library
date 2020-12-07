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

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('verifying if there are links in the app', () => {
  const { getByText } = render(<App />);
  const verifyingHome = getByText('Home');
  expect(verifyingHome).toBeInTheDocument();

  const verifyingAbout = getByText('About');
  expect(verifyingAbout).toBeInTheDocument();

  const verifyingFavoritePokemons = getByText('Favorite Pokémons');
  expect(verifyingFavoritePokemons).toBeInTheDocument();
});
