import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Requisito 4 Not Found Page', () => {
  it('Verifica se a pagina contem "h2" Page requested not found', () => {
    const { getByRole } = render(<NotFound />);
    const tag = getByRole('heading', { name: /page requested not found Crying emoji/i });
    expect(tag.tagName).toBe('H2');
  });

  it('Verifica se a página mostra a imagem', () => {
    const { getByAltText } = render(<NotFound />);
    const linkImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = getByAltText('Pikachu crying because the page requested was not found');
    expect(img.src).toBe(linkImage);
  });
});
