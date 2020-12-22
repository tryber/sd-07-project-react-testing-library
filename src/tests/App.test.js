import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWhithRouter';
import App from '../App';

describe('Testing App.js <¬ Checks if:', () => {
  test('if Renders a heading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Check if the main page Pokedex is loaded in URL path "/"', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Redirect from Home to Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Redirect from Home to About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText(/About/i);
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Redirect from Home to Favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favorite = getByText(/Favorite Pokémons/i);
    fireEvent.click(favorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Redirect to "Not Found" if URL is unknown', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/xablau');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
