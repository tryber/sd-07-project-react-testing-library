import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

test('se existe um texto na página', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  const notFound = getByText(/Page requested not found/i);
  expect(notFound).toBeInTheDocument();
});

test('se a página mostra uma imagem específica', () => {
  renderWithRouter(<NotFound />);
  const img = document.querySelector('img');
  expect(img.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
