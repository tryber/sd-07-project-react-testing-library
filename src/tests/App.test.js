import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testing the file App.js', () => {
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

  test('the first link has the text "Home" and redirects to the initial page with the "/" in the URL path', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homeLink = getByText(/\bHome\b/);
    expect(homeLink).toBeInTheDocument();

    fireEvent.click(getByText(/\bHome\b/));
    const homePage = getByText(/\bEncountered pokémons\b/);
    expect(homePage).toBeInTheDocument();
  });

  test('the second link has the text "About" and redirects to the about page with the "/about" in the URL path', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const aboutLink = getByText(/\bAbout\b/i);
    expect(aboutLink).toBeInTheDocument();

    fireEvent.click(getByText(/\bAbout\b/));
    const aboutPage = getByText(/\bAbout Pokédex\b/);
    expect(aboutPage).toBeInTheDocument();
  });

  test('the third link has the text "Favorite Pokémons" and redirects to the Pokémons Favoritados page with the "/favorites" in the URL path', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const favoriteLink = getByText(/\bFavorite Pokémons\b/);
    expect(favoriteLink).toBeInTheDocument();

    fireEvent.click(getByText(/\bFavorite Pokémons\b/));
    const favoritePage = getByText(/\bFavorite pokémons\b/);
    expect(favoritePage).toBeInTheDocument();
  });

  test('the page is redirected to the "Not Found" page when used an unknown URL', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/pagina/que-nao-existe/');
    const noMatch = getByText(/\bPage requested not found\b/);
    expect(noMatch).toBeInTheDocument();
  });
});
