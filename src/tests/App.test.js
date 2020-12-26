import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Tests the elements of the App.js component', () => {
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

  it('tests if the application has the links: Home, About and Favorite Pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/);
    expect(home).toBeInTheDocument();

    const about = getByText(/About/);
    expect(about).toBeInTheDocument();

    const favoritePokemons = getByText(/Favorite Pokémons/);
    expect(favoritePokemons).toBeInTheDocument();
  });

  it('test if the `Home` link redirects to the URL `/`', () => {
    const { getByText } = renderWithRouter(<App />);
    const homeLink = getByText(/Home/);
    expect(homeLink.getAttribute('href')).toBe('/');
  });

  it('test if the `About` link redirects to the URL `/about`', () => {
    const { getByText } = renderWithRouter(<App />);
    const aboutLink = getByText(/About/);
    expect(aboutLink.getAttribute('href')).toBe('/about');
  });

  it('test if the `Favorite Pokémons` link redirects to the URL `/favorites`', () => {
    const { getByText } = renderWithRouter(<App />);
    const favoriteLink = getByText(/Favorite Pokémons/);
    expect(favoriteLink.getAttribute('href')).toBe('/favorites');
  });

  it('must test a non-existent path and the error message', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/page-non-existent');
    const notFound = getByText(/Page requested not found/);
    expect(notFound).toBeInTheDocument();
  });
});
