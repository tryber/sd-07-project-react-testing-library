import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('testing App.js functionality', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Should contains a fixed set of navigation links on top.', () => {
    const { getByText } = renderWithRouter(<App />);

    const homeLink = getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();
    fireEvent.click(homeLink);

    const aboutLink = getByText(/about/i);
    expect(aboutLink).toBeInTheDocument();
    fireEvent.click(aboutLink);

    const favoriteLink = getByText(/Favorite Pokémons/i);
    expect(favoriteLink).toBeInTheDocument();
    fireEvent.click(favoriteLink);
  });

  it('Should redirect to home if clicks on homes link', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Should redirect to about if clicks on abouts link', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const aboutLink = getByText(/About/i);
    fireEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Should redirect to favorite pokemons if clicks in favorites link',
    () => {
      const { getByText, history } = renderWithRouter(<App />);

      const favoritePokemons = getByText(/Favorite Pokémons/i);
      fireEvent.click(favoritePokemons);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

  it('Should redirect to not found page if a pathname nonexistent is passed', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('wrongpath');
    const notFoundPage = getByText(/Page requested not found/i);
    expect(notFoundPage).toBeInTheDocument();
  });
});
