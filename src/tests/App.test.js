import React from 'react';
import renderWithRouter from '../renderWithRouter';
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

test('nav bar contains a certain group of links', () => {
  const { getByText } = renderWithRouter(<App />);

  const firstLink = getByText('Home');
  const secondLink = getByText('About');
  const thirdLink = getByText('Favorite Pokémons');
  expect(firstLink).toBeInTheDocument();
  expect(secondLink).toBeInTheDocument();
  expect(thirdLink).toBeInTheDocument();
});

test('redirects to Home if clicking Home link in navbar', () => {

});

