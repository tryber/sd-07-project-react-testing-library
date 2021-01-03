import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testando o arquivo NotFound.js', () => {
  test('se página contém um heading h2 com o texto especificado', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const title = getByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Page requested not found');
  });

  it('se página mostra a imagem especificada', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
