import { cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

afterEach(cleanup);

describe('Página principal', () => {
  it('Página principal é renderizada ao carregar a aplicação no caminho de URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const heading = getByText('Pokédex');
    const title = getByText('Encountered pokémons');
    history.push('/');
    expect(heading).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});

describe('Links do Header', () => {
  it('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLink = getByText('Home');
    const aboutLink = getByText('About');
    const favoriteLink = getByText('Favorite Pokémons');

    history.push('/');
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();

    history.push('/about');
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();

    history.push('/favorites');
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });
});

describe('Redirecionamento dos Links', () => {
  it('Testa o redirecionamento do link Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkHome = getByText('Home');
    fireEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa o redirecionamento do link About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkAbout = getByText('About');
    fireEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testa o redirecionamento do link Favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkFavorites = getByText('Favorite Pokémons');
    fireEvent.click(linkFavorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testa a falha de URL não encontrada', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/hello');
    const notFound = getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
