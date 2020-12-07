import React from 'react';
import { fireEvent, cleanup, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 1. Testando o arquivo App.js', () => {
  afterEach(cleanup);
  it('Teste se a página principal da Pokédex é renderizada.', () => {
    renderWithRouter(<App />);
    const heading = screen.getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  it('Aplicação contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);
    const nav = screen.getByRole(/nav/i);
    expect(nav).toBeInTheDocument();
    expect(screen.queryByText(/Home/i)).not.toBeNull();
    expect(screen.queryByText(/About/i)).not.toBeNull();
    expect(screen.queryByText(/Favorite Pokémons/i)).not.toBeNull();
  });
  it('Redirecionada à Home.', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Redirecionada para a página de About.', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Redirecionada para a página de Pokémons Favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const notFound = screen.getByText(/Not Found/i);
    expect(notFound).toBeInTheDocument();
  });
});
