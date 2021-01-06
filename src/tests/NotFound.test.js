import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testando a página de link incorreto', () => {
  it('Teste se pág contém um heading h2 com o texto "Page requested not found"', () => {
    render(<NotFound />);
    const h2 = screen.getByText(/Page requested not found/i);
    expect(h2).toBeInTheDocument();
    expect(h2.tagName).toBe('H2');
  });

  it('A página deve conter uma imagem com uma rota específica', () => {
    const imagem = render(<NotFound />);
    const imgsrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = imagem.querySelector('img');
    expect(img.src).toBe(imgsrc);
  });
});
.
