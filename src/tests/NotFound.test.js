import React from 'react';
import renderWithRouter from '../helper/testRouterHelper';
import { NotFound } from '../components';

describe('Testando o arquivo NotFound.js', () => {

  it('deve conter um heading h2 com o texto específico', () => {
    const { getByText } = renderWithRouter(<NotFound />)
        
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
    expect(notFound.tagName).toBe('H2')
  });

  it('deve possuir o gif do pikachu abaixo', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />)
        
    const images= getAllByRole('img');
    const srcExpected = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif'
    const imageElement = images.find(img => img.src === srcExpected)
    expect(imageElement.src).toBe(srcExpected)
  });
});

