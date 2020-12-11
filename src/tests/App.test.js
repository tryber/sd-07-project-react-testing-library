import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('for navigation links at the top of the page', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const homeButton = getByText('Home');
  const aboutButton = getByText('About');
  const favoritePokemonsButton = getByText('Favorite Pokémons');

  expect(homeButton).toBeInTheDocument();
  expect(aboutButton).toBeInTheDocument();
  expect(favoritePokemonsButton).toBeInTheDocument();
});

test('whether the home button redirects to the home page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const homeButton = getByText('Home');

  fireEvent.click(homeButton);
  expect(history.location.pathname).toBe('/');
  const homeText = getByText('Encountered pokémons');
  expect(homeText).toBeInTheDocument();
});

test('whether the about button redirects to the about page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const aboutButton = getByText('About');

  fireEvent.click(aboutButton);
  expect(history.location.pathname).toBe('/about');
  const aboutText = getByText('About Pokédex');
  expect(aboutText).toBeInTheDocument();
});

test('whether the Favorite Pokémons button redirects to the favorites page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const favoritePokemonsButton = getByText('Favorite Pokémons');

  fireEvent.click(favoritePokemonsButton);
  expect(history.location.pathname).toBe('/favorites');
  const favoritePokemonsText = getByText('Favorite pokémons');
  expect(favoritePokemonsText).toBeInTheDocument();
});

test('whether the home button redirects to the favorite pokemons page', () => {
  const { getByText, history } = renderWithRouter(<App />);

  history.push('/xablau');
  expect(history.location.pathname).toBe('/xablau');
  const pageNotFoundText = getByText('Page requested not found');
  expect(pageNotFoundText).toBeInTheDocument();
});
