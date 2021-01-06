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
    render(<NotFound />);
    const img = document.querySelector('img');
    // nesse caso, getByRole não funciona pois "se confunde" com o img do span ( da carinha triste)
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
