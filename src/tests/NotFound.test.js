import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testando o arquivo NotFound.js', () => {
  test('Teste se página contém um heading h2 com Page requested not found', () => {
    const { getByRole } = render(<NotFound />);
    const h2 = getByRole('heading', { name: /Page requested not found/i });
    expect(h2.tagName).toBe('H2');
  });

  test('Teste se página mostra a imagem correta', () => {
    const { getAllByRole } = render(<NotFound />);
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = getAllByRole('img');
    expect(img[1].src).toBe(src);
    // const img1 = getAllByRole('generic');
    // expect(img1[1].src).toBe(src);
    // console.log(img1.toHaveClass('not-found'));
  });
});
