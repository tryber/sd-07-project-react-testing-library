import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente App', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('If the Pokedex is rendered in the path "/"', () => {
    const { history } = renderWithRouter(<App />);

    const path = history.location.pathname;
    expect(path).toBe('/');
  });

  test('If the Links exist "Home", "About", "Favorite Pokémons"', () => {
    const { getByText } = renderWithRouter(<App />);

    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();
    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();
    const favoritePokemons = getByText(/Favorite Pokémons/i);
    expect(favoritePokemons).toBeInTheDocument();
  });

  test('By clicking on "Home" a page is redirected to "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const linkHome = getByText(/Home/i);
    fireEvent.click(linkHome);
    const path = history.location.pathname;
    expect(path).toBe('/');
  });

  test('By clicking on "About" a page is redirected to "/about"', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const linkAbout = getByText(/About/i);
    fireEvent.click(linkAbout);
    const path = history.location.pathname;
    expect(path).toBe('/about');
  });

  test('By clicking on "Favorite Pokémons" a page is redirected to "/favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const linkFavorites = getByText(/Favorite Pokémons/i);
    fireEvent.click(linkFavorites);
    const path = history.location.pathname;
    expect(path).toBe('/favorites');
  });

  test('When typing unknown path, redirects to page "Not Found"', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/naoencontrado');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
