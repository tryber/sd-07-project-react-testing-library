import React from 'react';
import NotFound from '../components/NotFound';
import RenderWithRouter from './RenderWithRouter';

describe(' Testando o arquivo NotFound.js', () => {
  test('A página contém um heading com o texto "Page requested not found 😭."', () => {
    const { getByText } = RenderWithRouter(<NotFound />);
    const heading = getByText('Page requested not found');
    expect(heading).toBeInTheDocument();
  });
  test('A página contém imagem do Pikachu.', () => {
    const { getByAltText } = RenderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
