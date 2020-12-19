import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando a página `Not Found`', () => {
  it('Teste se page contém um heading h2 com o texto "Page requested not found"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    expect(getByRole('heading')).toHaveTextContent(/Page requested not found/i);
  });

  it('Teste se a page contém a imagem de uma url desejada', () => {
    const { container } = renderWithRouter(<NotFound />);
    const image = container.querySelector('img');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
