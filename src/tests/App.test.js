import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('testing file App.js', () => {

  afterEach(cleanup);

  it('renders a reading with the text `Pokédex`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
    const homePathname = history.location.pathname;
    expect(homePathname).toBe('/');
  });

  it('the top of the application contains a link tith text "Home"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const homePathname = history.location.pathname;
    expect(homePathname).toBe('/');
  });

  it('the top of the application contains a link tith text "About"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const aboutPathname = history.location.pathname;
    expect(aboutPathname).toBe('/about');
  });

  it('the top of the application contains a link tith text "Favorite Pokémons"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const favoritesPathname = history.location.pathname;
    expect(favoritesPathname).toBe('/favorites');
  });

  it('application redirected to home page "/" when clicking on the "Home" link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const homePathname = history.location.pathname;
    expect(homePathname).toBe('/');
    const home = getByText(/Pokédex/i);
    expect(home).toBeInTheDocument();
  });

  it('application redirected to about page "/about" when clicking on the "About" link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const aboutPathname = history.location.pathname;
    expect(aboutPathname).toBe('/about');
    const about = getByText(/About Pokédex/i);
    expect(about).toBeInTheDocument();
  });

  it('application redirected to favorites page "/favorites" when clicking on the "Favorite Pokémons" link', () => {
    const { getByText, getAllByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const favoritesPathname = history.location.pathname;
    expect(favoritesPathname).toBe('/favorites');
    const favorites = getAllByText(/Favorite pokémons/i);
    expect(favorites.length).toBe(2);
  });

  it('application is redirected to the not found page when entering an unknown URL', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/doesnotexist/');
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
})
