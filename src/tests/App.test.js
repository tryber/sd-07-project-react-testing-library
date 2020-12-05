import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testing file App.js', () => {
  test('if the route / renders the home page of pokedex', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const pathname = history.location.pathname;
    expect(pathname).toBe('/');
    const homeText = getByText(/Encountered pokémons/i);
    expect(homeText).toBeInTheDocument();
  });

  test('if the links of navigation, home, about and favorite', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const links = getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
  });

  test('if the link home render pathname /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/');
    const homeText = getByText(/Encountered pokémons/i);
    expect(homeText).toBeInTheDocument();
  });

  test('if the link About render pathname /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/about');
    const aboutText = getByText(/About Pokédex/i);
    expect(aboutText).toBeInTheDocument();
  });

  test('if the link Pokémons Favoritados render pathname /favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/favorites');
    const favoriteText = getByText('Favorite pokémons');
    expect(favoriteText).toBeInTheDocument();
  });

  test('if the page not found render when the using a not existing path', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    history.push('/paginaquenaoexiste');
    const notFoundMessage = getByText(/not found/i);
    expect(notFoundMessage).toBeInTheDocument();
  });
});
