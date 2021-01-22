import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testando o arquivo NotFound', () => {
  it('testa se a página contém um h2 com o texto Page requested not found', () => {
    const { getByRole, getByText } = render(<NotFound />);
    const notFound = getByText('Page requested not found');

    expect(notFound).toBeInTheDocument();
    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
  });
  it('testa se a página mostra uma imagem', () => {
    const { getByAltText } = render(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');

    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
