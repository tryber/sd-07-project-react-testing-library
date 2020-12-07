import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o arquivo NotFound.js', () => {
  test('Teste se página contém um heading h2 com o texto Not Found', () => {
    const { queryByText, history } = renderWithRouter(<App />);
    const route = 'http://localhost/xablau';
    history.push(route);
    expect(queryByText(/Page requested not found/i).tagName).toBe('H2');
    expect(queryByText(/Page requested not found/i)).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const route = 'http://localhost/xablau';
    history.push(route);
    const srcExpected = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(getByRole('img',
      { name: /pikachu crying because the page requested was not found/i }).src)
      .toBe(srcExpected);
  });
});
