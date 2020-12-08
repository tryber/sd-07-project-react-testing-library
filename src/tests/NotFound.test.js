import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando a página `Not Found`', () => {
  it('Teste se pág contém um heading h2 com o texto "Page requested not found 😭"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    expect(getByRole('heading')).toHaveTextContent(/Page requested not found 😭/i);
  });

  it('Teste se a pág contém a imagem de uma url desejada', () => {
    const { container } = renderWithRouter(<NotFound />);
    // https://github.com/solid/react-components/blob/master/test/components/Image-test.jsx
    const image = container.querySelector('img');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
