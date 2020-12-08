import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

it('Verifica se há uma tag h2 com o texto: Page requested not found ', () => {
  const { getByText } = renderWithRouter(<NotFound />);

  const heading = getByText(/Page requested not found/);
  expect(heading).toBeInTheDocument();
});

it('Verifica se página mostra a imagem', () => {
  const { getAllByRole } = renderWithRouter(<NotFound />);
  const srcImgToFind = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const image = getAllByRole('img');

  expect(image[1].src).toBe(srcImgToFind);
});
