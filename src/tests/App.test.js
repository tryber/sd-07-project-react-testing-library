import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 1. Testando o arquivo App.js', () => {
  afterEach(cleanup);
  it('Teste se a página principal da Pokédex é renderizada.', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  it('Aplicação contém um conjunto fixo de links de navegação.', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const nav = getByRole(/nav/i);
    expect(nav).toBeInTheDocument();
    expect(getByText(/Home/i)).not.toBeNull();
    expect(getByText(/About/i)).not.toBeNull();
    expect(getByText(/Favorite Pokémons/i)).not.toBeNull();
  });
  it('Redirecionada à Home.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Redirecionada para a página de About.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Redirecionada para a página de Pokémons Favoritados.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/xablau');
    const notFound = getByText(/Not Found/i);
    expect(notFound).toBeInTheDocument();
  });
});
