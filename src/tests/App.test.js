import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o arquivo App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('Test if the Pokédex main page is rendered in the path /', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText(/Home/i);
    const about = screen.getByText(/About/i);
    const favorite = screen.getByText(/Favorite Pokémons/i);
    const title = screen.getByText(/Encountered pokémons/i);
    const { pathname } = history.location;

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(pathname).toBe('/');
  });

  it('Test if the application is redirected to ‘/’ by clicking on the Home link.', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText(/Home/i);
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const title = screen.getByText(/Encountered pokémons/i);
    expect(title).toBeInTheDocument();
  });

  it('Test if the application is redirected to /About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByText(/About/i);
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const title = screen.getByText(/About Pokédex/i);
    expect(title).toBeInTheDocument();
  });

  it('Test the link /Favorite Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByText(/Favorite Pokémons/i);
    fireEvent.click(favorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const title = screen.getAllByText(/Favorite pokémons/i);
    expect(title[1]).toBeInTheDocument();
  });

  it('Test if the application is redirected to the /NotFound page', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/nao-encontrada');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});

describe('Test whether the application contains a fixed set of navigation links.', () => {
  it('The first link must have the text Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText(/Home/i);
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('The second link must have the text About.', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const about = getByText(/About/i);
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('The third link must have the text Favorite Pokémons.', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByText(/Favorite Pokémons/i);
    fireEvent.click(favorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
