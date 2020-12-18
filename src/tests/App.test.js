import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testing "App.js" file:', () => {
  it('Should render a reading with the text "Pokédex"', () => {
    renderWithRouter(<App />);
    const heading = screen.getByText('Pokédex');
    expect(heading).toBeInTheDocument();
  });

  it('Should render a fixed link navigation set', () => {
    renderWithRouter(<App />);
    const home = screen.getByText('Home');
    expect(home).toBeInTheDocument();
    const about = screen.getByText('About');
    expect(about).toBeInTheDocument();
    const favoritePokemons = screen.getByText('Favorite Pokémons');
    expect(favoritePokemons).toBeInTheDocument();
  });

  it('Should redirect to the home page when the "Home" link is clicked', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText('Home');
    fireEvent.click(home);
    const path = history.location.pathname;
    expect(path).toBe('/');
  });

  it('Should redirect to the about page when the "About" link is clicked', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByText('About');
    fireEvent.click(about);
    const path = history.location.pathname;
    expect(path).toBe('/about');
  });

  it('Should redirect to favorite pokemons page when "Favorite Pokémons" link is clicked',
    () => {
      const { history } = renderWithRouter(<App />);
      const favoritePokemons = screen.getByText('Favorite Pokémons');
      fireEvent.click(favoritePokemons);
      const path = history.location.pathname;
      expect(path).toBe('/favorites');
    });

  it('Should redirect to the not found page when the "Not Found" link is clicked', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page/not-found');
    const noMatch = screen.getByText('Page requested not found');
    expect(noMatch).toBeInTheDocument();
  });
});
