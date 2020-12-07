import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testando o arquivo NotFound.js', () => {
  test('Se página contém um heading h2 com o texto "Page requested not found" 😭', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const about = getByRole('heading', {
      name: 'Page requested not found Crying emoji',
    });

    expect(about).toBeInTheDocument();
  });
  test('Se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = getByAltText(
      'Pikachu crying because the page requested was not found',
    );

    expect(img.src).toBe(src);
  });
});
