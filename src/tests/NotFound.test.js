import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

test('', () => {});

// Teste se página contém um heading h2 com o texto Page requested not found 😭;
test('if about contains h2 with about pokedex', () => {
  const { container } = renderWithRouter(<NotFound />);
  const [h2] = container.getElementsByTagName('h2');
  expect(h2).toHaveTextContent('Page requested not found');
});
// Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif
test('if about contains especific image', () => {
  const { container } = renderWithRouter(<NotFound />);
  const [img] = container.getElementsByTagName('img');
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
