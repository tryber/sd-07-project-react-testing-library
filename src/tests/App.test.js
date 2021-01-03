import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Application when first rendered', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  test('renders home page when URL is "/"', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
describe('Navigation Bar', () => {
  test('renders working link to "Home" page', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/about');
    const home = getByText(/Home/i);
    expect(history.location.pathname).toBe('/about');
    expect(home).toBeInTheDocument();
    userEvent.click(home);
    expect(history.location.pathname).toBe('/');
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });
  test('renders working link to "About" page', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const about = getByText(/About/i);
    expect(history.location.pathname).toBe('/');
    expect(about).toBeInTheDocument();
    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');
    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  });
  test('renders working link to "Favorites" page', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const favorites = getByText(/Favorite Pokémons/i);
    expect(history.location.pathname).toBe('/');
    expect(favorites).toBeInTheDocument();
    userEvent.click(favorites);
    expect(history.location.pathname).toBe('/favorites');
  });
  test('renders "NotFound" page when redirected to unknown URL', () => {
    const { history, getByText } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    history.push('/xablau');
    expect(history.location.pathname).toBe('/xablau');
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
