import { cleanup } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

afterEach(cleanup);

describe('Testando o arquivo NotFound.js', () => {
  test('Teste se página contém h2 com o texto Page requested not found 😭', () => {
    const { getByText, history } = renderWithRouter(<NotFound />);
    const notFoundPage = 'page-not-found';
    history.push(notFoundPage);
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch.tagName).toBe('H2');
  });

  test('Teste se página mostra o gif', () => {
    const { getAllByRole, history } = renderWithRouter(<NotFound />);
    const notFoundPage = 'page-not-found';
    history.push(notFoundPage);
    const gif = getAllByRole('img');
    expect(gif[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
