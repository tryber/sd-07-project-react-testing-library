import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testando o arquivo NotFound.js', () => {
  it('contém um heading h2 com o texto Page requested not found', () => {
    const { getByRole } = render(<NotFound />);
    const heading = getByRole('heading', { name: /Page requested not found/i });
    expect(heading.tagName).toBe('H2');
  });
  it('A imagem deve ter um link especifico', () => {
    const { getAllByRole } = render(<NotFound />);
    const image = getAllByRole('img');
    expect(image[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
