import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

test('Testando se página contém um heading h2 com o texto "not found".', () => {
  const { container } = renderWithRouter(<NotFound />);
  const h2 = container.querySelector('h2');

  expect(h2).toHaveTextContent('Page requested not found');
});

test('Testando se página mostra uma imagem especifica.', () => {
  const { container } = renderWithRouter(<NotFound />);
  const img = container.querySelector('img');

  expect(img).toHaveAttribute('src',
    'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
