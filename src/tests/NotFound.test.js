import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('4. Testando o arquivo NotFound.js', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
  });
  afterEach(cleanup);
  it('Contém um heading h2 com o texto Page requested not found', () => {
    const nam = /Page requested not found/i;
    const h2 = screen.getByRole('heading', { name: nam }, { level: 2 });
    expect(h2).toBeInTheDocument();
  });
  it('A página mostra a imagem:', () => {
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const nam = /pikachu crying because the page requested was not found/i;
    const img = screen.getByRole('img', { name: nam });
    expect(img.src).toBe(imgSrc);
  });
});
