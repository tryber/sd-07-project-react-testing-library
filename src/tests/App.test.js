import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Pokedéx is rendering', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});

describe('check if links are having the correct path', () => {
  it('have text `Home` in page with a link to `http://localhost/`', () => {
    const { getByText } = renderWithRouter(<App />);
    const homeLink = getByText(/Home/);
    expect(homeLink.href).toBe('http://localhost/');
  });

  it('have text `About` in page with a link to `http://localhost/about`', () => {
    const { getByText } = renderWithRouter(<App />);
    const aboutLink = getByText(/About/);
    expect(aboutLink.href).toBe('http://localhost/about');
  });

  it('have text `Favorite Pokémons` in page with a link to `http://localhost/favorites`', () => {
    const { getByText } = renderWithRouter(<App />);
    const favoritesLink = getByText(/Favorite Pokémons/);
    expect(favoritesLink.href).toBe('http://localhost/favorites');
  });
});

describe('check if navigation is working', () => {
  it('redirect to path `/` when `Home` is clicked', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/');
  });

  it('redirect to path `about` when `About` is clicked', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/about');
    const aboutPokedex = getByText(/About Pokédex/);
    expect(aboutPokedex).toBeInTheDocument();
  });

  it('redirect to path `favorites` when `Favorite Pokémons` is clicked', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/favorites');
    const favoritePokemons = getByText(/Favorite pokémons/);
    expect(favoritePokemons).toBeInTheDocument();
  });

  it('redirect to page `Not Found` when a not existing route is insert in the navigator', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/page-that-doesnt-exist');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
