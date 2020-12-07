import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';

import App from '../App';

import renderWithRouter from './renderWithRouter';

describe('Testando o arquivo App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('check that the main page is rendered in the URL / path', () => {
    const { getByText } = renderWithRouter(<App />);
    const title = getByText(/Encountered pokémons/i);
    expect(title).toBeInTheDocument();
  });

  it('expects that the top contains a fixed set of navigation links', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkHome = getByText(/Home/i);
    const linkAbout = getByText(/About/i);
    const linkFavorites = getByText(/Favorite Pokémons/i);
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorites).toBeInTheDocument();
  });

  it('redirects to the home page, at the URL / by clicking the Home link.s', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkHome = getByText(/Home/i);
    expect(linkHome).toBeInTheDocument();
    fireEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('redirects to the About page, at the URL /about by clicking the About link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkAbout = getByText(/About/i);
    expect(linkAbout).toBeInTheDocument();
    fireEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('redirects to the Favorites page, /favorites by clicking the Favorite link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkFavorites = getByText(/Favorite Pokémons/i);
    expect(linkFavorites).toBeInTheDocument();
    fireEvent.click(linkFavorites);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
