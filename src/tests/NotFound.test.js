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
    const { getByText, history } = renderWithRouter(<App />);
    const route = 'http://localhost/xablau';
    history.push(route);
    expect(getByText('img').src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
