import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('Testando arquivo app.js', () => {
  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});

describe('Testando arquivo app.js "nav links"', () => {
  test('O primeiro link deve possuir o texto Home.', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkHome = getByText('Home');
    const linkAbout = getByText('About');
    const linkFavorite = getByText('Favorite Pokémons');
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });

  it('Verifica se a aplicação é redirecionada para a página inicial', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    fireEvent.click(getByText(/Home/i));
    expect(pathname).toBe('/');
  });

  it('Verifica se a aplicação é redirecionada para a página About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Verifica redirecionamento para página "Not Found" caso URL  desconhecida', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/paginaNaoEncontrada/');
    const pageNotFound = getByText(/Page requested not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
