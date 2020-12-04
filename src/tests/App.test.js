import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

afterEach(cleanup);

it(`Teste se a página principal da Pokédex
    é renderizada ao carregar a aplicação no caminho de URL /.`, () => {
  const { history: { location: { pathname } } } = renderWithRouter(<App />);
  expect(pathname).toBe('/');
});

it(`Teste se o topo da aplicação 
    contém um conjunto fixo de links de navegação.`, () => {
  renderWithRouter(<App />);

  expect(screen.getByText(/home/i)).toBeInTheDocument();
  expect(screen.getByText(/about/i)).toBeInTheDocument();
  expect(screen.getByText(/favorite pokémons/i)).toBeInTheDocument();
});

it(`Teste se a aplicação é redirecionada para a página inicial,
    na URL / ao clicar no link Home da barra de navegação.`, () => {
  const { history } = renderWithRouter(<App />);
  fireEvent.click(screen.getByText(/home/i));
  const { location: { pathname } } = history;
  expect(pathname).toBe('/');
});

it(`Teste se a aplicação é redirecionada para a página de About,
    na URL /about, ao clicar no link About da barra de navegação.`, () => {
  const { history } = renderWithRouter(<App />);
  fireEvent.click(screen.getByText(/about/i));
  const { location: { pathname } } = history;
  expect(pathname).toBe('/about');
});

it(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,
   na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
  const { history } = renderWithRouter(<App />);
  fireEvent.click(screen.getByText(/favorite pokémons/i));
  const { location: { pathname } } = history;
  expect(pathname).toBe('/favorites');
});

it(`Teste se a aplicação é redirecionada para a página 
    Not Found ao entrar em uma URL desconhecida.`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/page/page-not-found');
  expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
});
