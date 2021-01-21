import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

test(`Teste se página contém um heading h2 com o texto
Page requested not found`, () => {
  const { container } = renderWithRouter(<NotFound />);
  const h2 = container.querySelector('h2');

  expect(h2).toHaveTextContent('Page requested not found');
});

test('Teste se página mostra a imagem.', () => {
  const { container } = renderWithRouter(<NotFound />);
  const image = container.querySelector('img');

  expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
