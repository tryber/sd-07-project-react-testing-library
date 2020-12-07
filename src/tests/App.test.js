import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Renderizar corretamente a aplicação no caminho especificado', () => {
  it('should have an pathname of `/`', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('should renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
});

describe('Top of page must have nav links', () => {
  test('if first link have the text `Home`', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();

    const linkArray = getAllByRole('link');
    expect(linkArray[0]).toHaveTextContent(/Home/i);
  });

  test('if second link have the text `About`', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();

    const linkArray = getAllByRole('link');
    expect(linkArray[1]).toHaveTextContent(/About/i);
  });

  test('if third link have the text `Favorite Pokémons`', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const favorites = getByText(/Favorite Pokémons/i);
    expect(favorites).toBeInTheDocument();

    const linkArray = getAllByRole('link');
    expect(linkArray[2]).toHaveTextContent(/Favorite Pokémons/i);
  });

  it('should redirect to path `/` when click in `Home`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('should redirect to path `/about` when click in `About`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText(/About/i);
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('should redirect to path `/favorites` when click in `Favorite Pokémons`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favorites = getByText(/Favorite Pokémons/i);
    fireEvent.click(favorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('should redirect to a `Not Found page` when an unkown URL is inserted', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pageThatDoesntExist');
    const h2Title = getByText(/Page requested not found/i);
    expect(h2Title).toBeInTheDocument();
  });
});
