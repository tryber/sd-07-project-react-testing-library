import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('se a página contém um heading h2 com Page requested not found', () => {
  const { getByRole } = render(<NotFound />);
  const h2 = getByRole('heading', { name: 'Page requested not found Crying emoji' });
  expect(h2.tagName).toBe('H2');
});

test('se a página mostra a imagem correta', () => {
  const { getByAltText } = render(<NotFound />);
  const link = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const img = getByAltText('Pikachu crying because the page requested was not found');
  expect(img.src).toBe(link);
});
