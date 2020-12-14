import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { cleanup, fireEvent, getByText, render, screen } from '@testing-library/react';
import App from '../App';
import TestingRouter from '../components/TestingRouter';

afterEach(cleanup);

describe('first requirement', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('should render Home page of the Pokedex if the path is `/`', () => {
    const { history } = TestingRouter(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const pathname = history.location.pathname;
    if (pathname === '/') {
      const title = screen.getByText(/encountered pokémons/i);
      expect(title).toBeInTheDocument();
    }
  });

  it('should render `Home`, `About`, `Favorite Pokémons` links respectively', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const links = screen.queryAllByRole('link');
    expect(links[0]).toBeInTheDocument();
    expect(links[0].innerHTML).toBe('Home');

    expect(links[1]).toBeInTheDocument();
    expect(links[1].innerHTML).toBe('About');

    expect(links[2]).toBeInTheDocument();
    expect(links[2].innerHTML).toBe('Favorite Pokémons');
  });

  it('should render Home page when click the `Home` button', () => {
    const { history } = TestingRouter(<App />);

    const homeLink = screen.getByText(/home/i);
    fireEvent.click(homeLink);
    const pathname = history.location.pathname;
    expect(pathname).toBe('/');
  });

  it('should render About page when click the `About` button', () => {
    const { history } = TestingRouter(<App />);

    const aboutLink = screen.getByText(/about/i);
    fireEvent.click(aboutLink);
    const pathname = history.location.pathname;
    expect(pathname).toBe('/about');
  });

  it('should render Favorite page when click the `Favorite Pokémons` button', () => {
    const { history } = TestingRouter(<App />);

    const favoriteLink = screen.getByText(/favorite pokémons/i);
    fireEvent.click(favoriteLink);
    const pathname = history.location.pathname;
    expect(pathname).toBe('/favorites');
  });

  it('should render Not Found page if the URL is unknown', () => {
    const { history } = TestingRouter(<App />);

    history.push('/strogonoff');
    const notFound = screen.getByText(/Page requested not found/i);

    expect(notFound).toBeInTheDocument();
  });
})
