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

  test('the link "Home" exists redirecting to the initial page on URL "/"', () => {
    const { getByText } = renderWithRouter(<App />);
    const homeLink = getByText(/\bHome\b/);
    expect(homeLink).toBeInTheDocument();
    fireEvent.click(getByText(/\bHome\b/));
    const homePage = getByText(/\bEncountered pokémons\b/);
    expect(homePage).toBeInTheDocument();
  });

  test('the link "About" exists redirecting to the initial page on URL "/about"', () => {
    const { getByText } = renderWithRouter(<App />);
    const aboutLink = getByText(/\bAbout\b/i);
    expect(aboutLink).toBeInTheDocument();
    fireEvent.click(getByText(/\bAbout\b/));
    const aboutPage = getByText(/\bAbout Pokédex\b/);
    expect(aboutPage).toBeInTheDocument();
  });

  test(`the link "Favorite Pokémons" exists redirecting to the initial 
  page on URL "/favorites"`, () => {
    const { getByText } = renderWithRouter(<App />);
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
