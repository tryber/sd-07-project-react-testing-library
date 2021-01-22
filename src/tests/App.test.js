import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import TestingRouter from '../components/TestingRouter';

describe('1st Req. | Testing App.js', () => {
  it(' should render a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const links = getAllByRole('link');
    expect(links[0].innerHTML).toBe('Home');
    expect(links[1].innerHTML).toBe('About');
    expect(links[2].innerHTML).toBe('Favorite Pokémons');
  });

  it('should render Home page when click Home button', () => {
    const { history: { location: { pathname } } } = TestingRouter(<App />);
    const HomeBtn = screen.getByText(/home/i);
    fireEvent.click(HomeBtn);
    expect(pathname).toBe('/');
  });

  it('should render About page when click the `About` button', () => {
    const { history } = TestingRouter(<App />);

    const aboutLink = screen.getByText(/about/i);
    fireEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('should render Fav Pokémons page when click the `Fav Pokémons` button', () => {
    const { history } = TestingRouter(<App />);

    const favBtn = screen.getByText(/favorite pokémons/i);
    fireEvent.click(favBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('should render notFound if the url is unknow', () => {
    const { history } = TestingRouter(<App />);
    history.push('/strogonoff');
    const notFound = screen.getByText(/page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
