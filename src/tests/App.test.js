import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

// prettier-ignore
test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('Navegation Links', () => {
  test('app has navegation links: Home, About and Favorite', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const linkHome = getByText(/Home/i);
    const linkAbout = getByText(/About/i);
    const linkFavorite = getByText(/Favorite Pokémons/i);

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });

  test('if after clicking on Home, the URL path is /', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const linkHome = getByText(/Home/i);
    fireEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const homeMessage = getByText(/Encountered pokémons/i);
    expect(homeMessage).toBeInTheDocument();
  });

  test('if after clicking on About, the URL path is /about', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const linkAbout = getByText(/About/i);
    fireEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const aboutMessage = getByText(/About Pokédex/i);
    expect(aboutMessage).toBeInTheDocument();
  });

  test('if after clicking on Favorite Pokémon, the URL path is /favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const linkFavorite = getByText(/Favorite Pokémons/i);
    fireEvent.click(linkFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('if the URL is unknown, should appear the page not found', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/unknownpage');
    const noMatchMessage = getByText(/Page requested not found/i);
    expect(noMatchMessage).toBeInTheDocument();
  });
});
