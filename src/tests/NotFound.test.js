import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testando o arquivo About.js', () => {
  it('a página contém um heading h2 com o texto Page requested not found', () => {
    const { getByRole } = render(<NotFound />);
    expect(getByRole('heading')).toHaveTextContent('Page requested not found');
  });

  it('a página mostra a imagem', () => {
    const { getByAltText } = render(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
