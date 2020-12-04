import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

describe('Requisito 1', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('header with links exist', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();
    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();
    const favorites = getByText(/Favorite Pokémons/i);
    expect(favorites).toBeInTheDocument();
  });

  test('app redirect correctly to home', () => {
    const { getByText, history } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const home = getByText(/Home/i);
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('app redirect correctly to about', () => {
    const { getByText, history } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const about = getByText(/About/i);
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/About');
  });

  test('app redirect correctly to favorite pokémons', () => {
    const { getByText, history } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const favorites = getByText(/Favorite Pokémons/i);
    fireEvent.click(favorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('app redirect correctly to not found', () => {
    const { getByText, history } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const route = '/notExist';
    history.push(route);
    const notFound = getByText(/page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
