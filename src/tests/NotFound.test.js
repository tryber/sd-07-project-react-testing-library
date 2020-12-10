import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

test('Teste se página contém um heading h2', () => {
  const { container } = renderWithRouter(<NotFound />);
  const [h2] = container.getElementsByTagName('h2');
  expect(h2).toBeInTheDocument();
  expect(h2).toHaveTextContent('Page requested not found 😭');
});

test('Verifica se a pagina About renderiza uma img', () => {
  const { container } = renderWithRouter(<NotFound />);
  const [img] = container.getElementsByClassName('not-found-image');
  expect(img).toBeInTheDocument();
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
