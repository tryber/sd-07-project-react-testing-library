import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
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

it('should be able to render the home page', () => {
  const { history } = renderWithRouter(<App />);

  expect(history.location.pathname).toBe('/');
});

it('should contains three links: Home, About, Favorite Pokemons', () => {
  const { getByText } = renderWithRouter(<App />);

  const homeLink = getByText(/Home/);
  const aboutLink = getByText(/About/);
  const favoritePokemonLink = getByText(/Favorite Pokémon/);

  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favoritePokemonLink).toBeInTheDocument();
});

it('should direct to the Home Page when Home link is clicked', () => {
  const { getByText, history } = renderWithRouter(<App />);

  fireEvent.click(getByText(/Home/));
  const { pathname } = history.location;

  expect(pathname).toBe('/');
});

it('should direct to the About Page when About link is clicked', () => {
  const { getByText, history } = renderWithRouter(<App />);

  fireEvent.click(getByText(/About/));
  const { pathname } = history.location;

  expect(pathname).toBe('/about');
});

it('should direct to the Favorite Pokémon Page when Favorite Pokémon link is clicked',
  () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Favorite Pokémon/));
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

it('should direct to Page Not Found when an invalidate link is accessed', () => {
  const { getByText, history } = renderWithRouter(<App />);

  history.push('/johndoe');
  const pageNotFound = getByText(/Page requested not found/);

  expect(pageNotFound).toBeInTheDocument();
});
