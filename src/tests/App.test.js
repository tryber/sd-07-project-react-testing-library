import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verificando se os links redirecionam corretamente.', () => {
  afterEach(cleanup);
  test('Testando o link Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkText = getByText(/home/i);
    fireEvent.click(linkText);
    const pathName = history.location.pathname;
    expect(linkText).toBeInTheDocument();
    expect(pathName).toBe('/');
  });

  test('Verficando o About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkText = getByText(/About/i);
    fireEvent.click(linkText);
    const pathName = history.location.pathname;
    expect(linkText).toBeInTheDocument();
    expect(pathName).toBe('/about');
  });

  test('Testando Favorite.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkText = getByText(/Favorite Pokémons/i);
    fireEvent.click(linkText);
    const textInPage = (/Favorite pokémons/i);
    expect((textInPage).toBeInTheDocument());
    expect(history.location.pathname).toBe('/favorites');
  });
});
