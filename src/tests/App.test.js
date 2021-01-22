import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('App.js Tests`', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('checks if Home, About and Favorite links are rendered', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    const about = getByText(/About/i);
    const favorite = getByText(/Favorite Pokémons/i);
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  it('Checks if clicking "Home" link, redirectes to the url "/"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText('Home');
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Checks if clicking "About" link, redirects to the url "/about"', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const about = getByText(/About/i);
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Checks if clicking "Favorite Pokémons" link, redirects to "/favorites"', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const favorites = getByText(/Favorite Pokémons/i);
    fireEvent.click(favorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Checks if chosing a unespecified pathname redirects to NotFound', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push('/marcio');
    const notFound = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(notFound).toBeInTheDocument();
  });
});
