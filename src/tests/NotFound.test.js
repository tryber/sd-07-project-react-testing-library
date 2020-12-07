import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('testa se a página contem um h2 com o texto Page requested not found 😭', () => {
  const { getByText, getByLabelText } = render(<NotFound />);
  const text = getByText(/Page requested not found/i);
  const emoji = getByLabelText(/Crying emoji/i);
  expect(text).toBeInTheDocument();
  expect(emoji).toBeInTheDocument();
});

test('Testa se a página mostra a imagem correta', () => {
  const { getByAltText } = render(<NotFound />);
  const img = getByAltText(/Pikachu crying because the page requested was not found/i);
  expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
