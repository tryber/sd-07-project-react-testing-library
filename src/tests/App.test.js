import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

test('Verificando se ao entrar na página nos encontramos na home', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const pageText = getByText(/about/i);
  const pathName = history.location.pathname;
  expect(pageText).toBeInTheDocument();
  expect(pathName).toBe('/');
});

describe('Verificando se os links redirecionam corretamente.', () => {
  it('Testando o link Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkText = getByText(/home/i);
    fireEvent.click(linkText);
    const pathName = history.location.pathname;
    expect(linkText).toBeInTheDocument();
    expect(pathName).toBe('/');
  });

  it('Verficando o About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkText = getByText(/About/i);
    fireEvent.click(linkText);
    const pathName = history.location.pathname;
    expect(linkText).toBeInTheDocument();
    expect(pathName).toBe('/about');
  });

  it('Testando Favorite.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkText = getByText(/Favorite pokémons/i);
    fireEvent.click(linkText);
    const pathName = history.location.pathname;
    expect(linkText).toBeInTheDocument();
    expect(pathName).toBe('/favorites');
  });
});

test('Deverá ir para "Page Not Found" quando tentar acessar um link inválido', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/teste');
  const pageText = getByText(/page requested not found/i);
  expect(pageText).toBeInTheDocument();
});
