import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('4.Testando o arquivo NotFound.js', () => {
  it('Teste se página contém um heading h2', () => {
    const { getByText, getByRole } = render(<NotFound />);
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    const text = getByText(/Page requested not found/i);
    expect(text).toBeInTheDocument();
  });
  it('Teste se página mostra a imagem', () => {
    const { getByAltText } = render(<NotFound />);
    const image = getByAltText(/Pikachu/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
