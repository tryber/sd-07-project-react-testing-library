import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('1. Testing the App.js file', () => {
  it(`The main page of Pokédex is rendered when loading the
  application in the URL path /.`, () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('The top of the application contains a fixed set of navigation links.', () => {
    const { getByText } = renderWithRouter(<App />);

    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();

    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();

    const favorites = getByText(/Favorite Pokémons/i);
    expect(favorites).toBeInTheDocument();
  });

  it(`The application is redirected to the home page, at the URL /
  by clicking on the Home link in the navigation bar.`, () => {
    const { getByText, history } = renderWithRouter(<App />);

    const home = getByText(/Home/i);
    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  it(`The application is redirected to the About page, at the URL /
  about, by clicking on the About link in the navigation bar.`, () => {
    const { getByText, history } = renderWithRouter(<App />);

    const about = getByText(/About/i);
    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  it(`The application is redirected to the Favorite Pokémon page, at the URL /
  favorites, by clicking on the Favorite Pokémons link in the navigation bar.`, () => {
    const { getByText, history } = renderWithRouter(<App />);

    const favorites = getByText(/Favorite Pokémons/i);
    fireEvent.click(favorites);
    expect(history.location.pathname).toBe('/favorites');
  });

  it(`The application is redirected to the Not Found page when entering an
  unknown URL.`, () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/notFound');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
