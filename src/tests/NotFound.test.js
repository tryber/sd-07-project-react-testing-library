import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando o arquivo de Not found', () => {
  test('Teste se página contém um heading', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
  });
  test('se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
