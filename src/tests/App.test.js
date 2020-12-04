import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('1. Testando o arquivo App.js', () => {
  it(`Teste se a página principal da Pokédex é renderizada
  ao carregar a aplicação no caminho de URL /.`, () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Encountered pokémons/i);
    expect(heading).toBeInTheDocument();
  });

  it(`Teste se o topo da aplicação contém um conjunto fixo de links 
  de navegação`, () => {
    const { getByText } = renderWithRouter(<App />);
    const linkHome = getByText(/home/i);
    const linkAbout = getByText(/about/i);
    const linkFavorite = getByText(/favorite pokémons/i);

    expect(linkHome).toBeInTheDocument();
    expect(linkHome.href).toBe('http://localhost/');

    expect(linkAbout).toBeInTheDocument();
    expect(linkAbout.href).toBe('http://localhost/about');

    expect(linkFavorite.href).toBe('http://localhost/favorites');
    expect(linkFavorite).toBeInTheDocument();
  });

  it(`Teste se a aplicação é redirecionada para a página inicial, na URL / 
  ao clicar no link Home da barra de navegação`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkHome = getByText(/home/i);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    fireEvent.click(linkHome);
    expect(pathname).toBe('/');
  });

  it(`Teste se a aplicação é redirecionada para a página de About, na URL 
  /about, ao clicar no link About da barra de navegação.`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkAbout = getByText(/about/i);

    const { pathname: pathnameHome } = history.location;
    expect(pathnameHome).toBe('/');

    fireEvent.click(linkAbout);
    const { pathname: pathnameAbout } = history.location;
    expect(pathnameAbout).toBe('/about');
  });

  it(`Teste se a aplicação é redirecionada para a página de Pokémons 
  Favoritados, na URL /favorites, ao clicar no link Favorite 
  Pokémons da barra de navegação.`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkFavorites = getByText(/favorite pokémons/i);

    const { pathname: pathnameHome } = history.location;
    expect(pathnameHome).toBe('/');

    fireEvent.click(linkFavorites);
    const { pathname: pathnameFavorites } = history.location;
    expect(pathnameFavorites).toBe('/favorites');
  });

  it(`Teste se a aplicação é redirecionada para a página Not Found 
  ao entrar em uma URL desconhecida.`, () => {
    const { getByText, history } = renderWithRouter(<App />);

    const { pathname: pathnameHome } = history.location;
    expect(pathnameHome).toBe('/');

    history.push('/url-desconhecida');

    const message = getByText(/Page requested not found/i);
    expect(message).toBeInTheDocument();
  });

  it('Renderiza o título da página num heading h1', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', { name: /Pokédex/i });
    expect(title).toBeInTheDocument();
  });
});
