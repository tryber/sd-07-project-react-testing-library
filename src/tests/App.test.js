import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('if render the links in the home page', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const homeLink = getByText(/Home/i);
  const aboutLink = getByText(/About/i);
  const favoriteLink = getByText(/Favorite Pokémons/i);

  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favoriteLink).toBeInTheDocument();
});

test('if Pokedex main page is rendered', () => {
  renderWithRouter(<App />);
  const encountered = screen.getByText(/encountered pokémons/i);

  expect(encountered).toBeInTheDocument();
});

describe('test if the links and the paths are valid', () => {
  it('should contain the links and the "/" path in home', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByText(/home/i);
    const aboutLink = screen.getByText(/about/i);
    const favoriteLink = screen.getByText(/favorite pokémons/i);

    fireEvent.click(homeLink);
    const homePath = history.location.pathname;

    expect(homePath).toBe('/');
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('should contain the links and the "/about" path in about', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByText(/home/i);
    const aboutLink = screen.getByText(/about/i);
    const favoriteLink = screen.getByText(/favorite pokémons/i);

    fireEvent.click(aboutLink);
    const aboutPath = history.location.pathname;

    expect(aboutPath).toBe('/about');
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('should contain the links and the "/about" path in about', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByText(/home/i);
    const aboutLink = screen.getByText(/about/i);
    const favoriteLink = screen.getByText(/favorite pokémons/i);

    fireEvent.click(favoriteLink);
    const favoritePath = history.location.pathname;

    expect(favoritePath).toBe('/favorites');
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('should render not found', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByText(/home/i);
    const aboutLink = screen.getByText(/about/i);
    const favoriteLink = screen.getByText(/favorite pokémons/i);

    history.push('/whatever');
    const notFoundPage = screen.getByText(/Page requested not found/i);

    expect(notFoundPage).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });
});
