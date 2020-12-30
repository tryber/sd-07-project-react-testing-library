import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

test('renders a heading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const route = '/';
  history.push(route);
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('Verify if a nav bar exists in the main page.', () => {
  afterEach(cleanup);
  it('should exist in the document.', () => {
    const { getByRole } = renderWithRouter(<App />);
    const navBar = getByRole('navigation');
    expect(navBar).toBeInTheDocument();
  });
  it('should have be three links inside, `Home`, `About` and `Favorite Pokémons`', () => {
    const { getByRole } = renderWithRouter(<App />);
    const navBar = getByRole('navigation');
    const homeLink = navBar.firstElementChild;
    const aboutLink = homeLink.nextElementSibling;
    const favoritPokeLink = aboutLink.nextElementSibling;
    expect(homeLink).toHaveTextContent('Home');
    expect(aboutLink).toHaveTextContent('About');
    expect(favoritPokeLink).toHaveTextContent('Favorite Pokémons');
  });
  it('should render `/` route when `Home` link is clicked.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLink = getByText(/Home/i);

    fireEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('should render `/about` route when `About` link is clicked.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutLink = getByText(/About/i);

    fireEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('should render `/favorites` route when `Favorite Pokémons` link is clicked.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoritePokeLink = getByText(/Favorite Pokémons/i);

    fireEvent.click(favoritePokeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
