import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
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

describe('Requirement - 01', () => {
  test('whether the top of the application contains a fixed set of navigation links', () => {
    renderWithRouter(<App />);

    const HomeLink = screen.getByText(/home/i);
    const AboutLink = screen.getByText(/about/i);
    const FavoritePokemonLink = screen.getByText(/favorite pokémon/i);

    expect(HomeLink).toBeInTheDocument();
    expect(AboutLink).toBeInTheDocument();
    expect(FavoritePokemonLink).toBeInTheDocument();

    expect(HomeLink.tagName).toBe('A');
    expect(AboutLink.tagName).toBe('A');
    expect(FavoritePokemonLink.tagName).toBe('A');
  });

  test('if the application is redirected to the homepage, at the URL / by clicking on the Home link in the navigation bar', () => {
    const { history } = renderWithRouter(<App />);

    const HomeLink = screen.getByText(/home/i);

    fireEvent.click(HomeLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('if the application is redirected to the About page, in the URL / about, by clicking on the About link in the navigation bar', () => {
    const { history } = renderWithRouter(<App />);

    const AboutLink = screen.getByText(/about/i);

    fireEvent.click(AboutLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  test('if the application is redirected to the Favorite Pokémon page, in the URL / favorites, by clicking on the Favorite Pokémons link in the navigation bar.', () => {
    const { history } = renderWithRouter(<App />);

    const FavoritePokemonLink = screen.getByText(/favorite pokémon/i);

    fireEvent.click(FavoritePokemonLink);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  test('if the application is redirected to the Not Found page when entering an unknown URL.', () => {
    const { history } = renderWithRouter(<App />);

    const wrongPath = 'wrong/path/test';
    history.push(wrongPath);

    const pageNotFound = screen.getByText(/Page requested not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
