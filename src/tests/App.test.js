import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testing App.js archive', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);

    expect(heading).toBeInTheDocument();
  });
  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('renders a fixed navigation bar, containing three links', () => {
    renderWithRouter(<App />);

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Favorite Pokémons/i)).toBeInTheDocument();
  });

  test('when `Home` link is clicked, redirects to route `/`', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText('Home'));

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('when `About` link is clicked, redirects to route `/about`', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText('About'));

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('when `Favorite Pokémons` link is clicked, redirects to route `/favorites`',
    () => {
      const { history } = renderWithRouter(<App />);
      fireEvent.click(screen.getByText('Favorite Pokémons'));

      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

  test('when path doesnt exist, render page `Not Found`', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page/notfound/');

    const notFound = screen.getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
