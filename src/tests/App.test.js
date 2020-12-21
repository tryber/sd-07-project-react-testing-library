import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Testing routes', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('shows the Pokédex when the route is `/`', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const subtitle = getByText(/Encountered pokémons/i);
    expect(subtitle).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('top menu contains this links: "Home", "About", "Favorite Pokémons"',
    () => {
      const { getByText } = renderWithRouter(<App />);

      const menuHead = getByText(/Home/i);
      const menuAbout = getByText(/About/i);
      const menuFavoritePokemons = getByText(/Favorite Pokémons/i);

      expect(menuHead).toBeInTheDocument();
      expect(menuAbout).toBeInTheDocument();
      expect(menuFavoritePokemons).toBeInTheDocument();
    });

  test('aplication is redirected to Home page', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const menuHead = getByText(/Home/i);
    expect(menuHead).toBeInTheDocument();

    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('aplication is redirected to About page', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const subtitle = getByText(/Encountered pokémons/i);
    expect(subtitle).toBeInTheDocument();

    const menuAbout = getByText(/About/i);
    expect(menuAbout).toBeInTheDocument();

    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const about = getByText(/About Pokédex/i);
    expect(about).toBeInTheDocument();
  });

  test('aplication is redirected to Favorite Pokémons page', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const subtitle = getByText(/Encountered pokémons/i);
    expect(subtitle).toBeInTheDocument();

    const menuFavoritePokemons = getByText(/Favorite Pokémons/i);
    expect(menuFavoritePokemons).toBeInTheDocument();

    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const favorites = getByText(/No favorite pokemon found/i);
    expect(favorites).toBeInTheDocument();
  });

  test('aplication is redirected to Not Found page', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const subtitle = getByText(/Encountered pokémons/i);
    expect(subtitle).toBeInTheDocument();

    const routeNotFound = '/pokemon';
    history.push(routeNotFound);

    const pageNotFound = getByText(/Page requested not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
