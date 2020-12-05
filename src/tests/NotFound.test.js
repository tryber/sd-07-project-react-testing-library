import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import '@testing-library/jest-dom';
import NotFound from '../components/NotFound';

describe('Testando o arquivo NotFound.js, requisito 4', () => {
  it('Teste se página contém um heading h2 com o texto Page requested found 😭.', () => {
    const { getByText, getByRole } = renderWithRouter(<NotFound />);
    const h2 = getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    const h2Text = getByText(/Page requested not found/i);
    expect(h2Text).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem notFound', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
