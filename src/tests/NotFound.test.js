import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Testa se página contém um heading h2 com o texto Page requested not found', () => {
  const { getByRole } = render(<NotFound />);
  const notFound = getByRole('heading', {name: /Page requested not found/i});
  expect(notFound).toBeInTheDocument();
});

test('Testa se página mostra a imagem de gif', () => {
  const { queryAllByRole } = render(<NotFound />);
  const image = queryAllByRole('img')[1];

  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
