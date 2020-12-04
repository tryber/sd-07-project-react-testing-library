import React from 'react';
import { Router, MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('tests the home page for the application', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('contains 3 links with the text "Home", "About" and "Favorite Pokémons"', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(getByRole('link', { name: /About/i })).toBeInTheDocument();
    expect(getByRole('link', { name: /Favorite Pokémons/i })).toBeInTheDocument();
  });

  it('redirects to the "Home" page when clicked in the correct link', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const linkHome = getByRole('link', { name: /Home/i });
    fireEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('redirects to the "About" page when clicked in the correct link', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const linkAbout = getByRole('link', { name: /About/i });
    fireEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('redirects to the "Favorite Pokémons" when clicked in the correct link', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const linkFavorites = getByRole('link', { name: /Favorite Pokémons/i });
    fireEvent.click(linkFavorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('redirects to "Not found" page when user tries an in invalid page', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const route = '/xablau';
    history.push(route);
    const pageNotFound = getByText(/Page requested not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
