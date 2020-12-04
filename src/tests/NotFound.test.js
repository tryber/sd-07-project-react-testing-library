import { cleanup } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../helpers/renderWithRouter';

afterEach(cleanup);

describe('Not Found - Teste de conteúdo', () => {
  it('Deve conter h2 com texto "Page Request Not Found"', () => {
    const { getByText, getByRole } = renderWithRouter(<NotFound />);
    const h2Element = getByRole('heading', { level: 2 });
    const h2Content = getByText('Page requested not found');
    expect(h2Element).toBeInTheDocument();
    expect(h2Content).toBeInTheDocument();
  });

  it('Deve renderizar imagem do pikachu chorando', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');

    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
