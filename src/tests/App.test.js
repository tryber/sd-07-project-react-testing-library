import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

describe('Testing the file App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Test if the Pokédex main page is rendered by loading', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const title = screen.getByText(/Pokédex/i);
    expect(title).toBeInTheDocument();
  });

  test('Test whether the top of the application contains a fixed set of', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const home = screen.getByText(/Home/i);
    expect(home).toBeInTheDocument();
    const about = screen.getByText(/About/i);
    expect(about).toBeInTheDocument();
    const favorite = screen.getByText(/Favorite Pokémons/i);
    expect(favorite).toBeInTheDocument();
  });

  test('is redirected to the home page, by clicking on the Home link', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('application is redirected to the about page, by clicking on the About', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('is redirected to the favorites page, on the Favorite Pokémons link', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('application is redirected to the Not Found page, entering an unknown URL', () => {
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
