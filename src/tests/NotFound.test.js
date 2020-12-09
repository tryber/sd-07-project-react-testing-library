import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('A página contém um heading h2 com o texto Page requested not found 😭', () => {
  const { container } = render(<NotFound />);
  const tagH2 = container.querySelector('h2');
  expect(tagH2).toHaveTextContent('Page requested not found 😭');
});

test('Página mostra https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
  const { container } = render(<NotFound />);
  const tagImg = container.querySelector('img');
  expect(tagImg).toBeInTheDocument();
  expect(tagImg.getAttribute('src')).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
