import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testando página not  found', () => {
  it('Testando se a página contém texto Page requested not found ', () => {
    const { getByText } = render(<NotFound />);
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
  it('Testando se a imagem aparece', () => {
    render(<NotFound />);
    const img = document.querySelector('img');
    expect(img.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
