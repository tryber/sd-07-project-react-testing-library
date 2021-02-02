import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('NotFound.js', () => {
  it('deve renderizar um heading com o texto `Page requested not found`', () => {
    const { getByText, history } = renderWithRouter(<NotFound />);
    history.push('/notFound');

    const heading = getByText(/page requested not found/i);
    expect(heading).toBeInTheDocument();
  });

  it('deve renderizar uma imagem específica', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const img = getByAltText(
      /pikachu crying because the page requested was not found/i,
    );

    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
