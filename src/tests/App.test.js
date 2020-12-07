import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

afterEach(cleanup);

describe('Testing the App.js file', () => {
  it('the Pokédex main page is rendered', () => {
    const { getByText } = renderWithRouter(<App />);
    const text = getByText('Pokédex');

    expect(text).toBeInTheDocument();
  });
  it(' top of the application contains a fixed set of navigation links', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Home');
    const about = getByText('About');
    const favoritePokemons = getByText('Favorite Pokémons');

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });
  it('the application is redirected to the home page, at the URL / ', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText('Home');

    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });
  it('the application is redirected to the About page, at the URL / about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText('About');

    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });
  it('the application is redirected at the URL / favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favorites = getByText('Favorite Pokémons');

    fireEvent.click(favorites);
    expect(history.location.pathname).toBe('/favorites');
  });
  it('the application is redirected to the Not Found page.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/notfound');
    expect(history.location.pathname).toBe('/notfound');

    const notfound = getByText('Page requested not found');
    expect(notfound).toBeInTheDocument();
  });
});
