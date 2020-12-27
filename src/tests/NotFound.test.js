import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testando o arquivo NotFound.js', () => {
  it('A página contém um heading h2 com o texto Page requested not found 😭', () => {
    const { container } = render(<NotFound />);
    const h2 = container.querySelector('h2');
    expect(h2).toHaveTextContent('Page requested not found 😭');
  });
  it('Teste se página mostra a imagem ', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const srcImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = getAllByRole('img');

    expect(img[1].src).toBe(srcImg);
  });
});
