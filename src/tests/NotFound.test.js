import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import '@testing-library/jest-dom';
import NotFound from '../components/NotFound';

describe('Testando o arquivo NotFound.js, requisito 4', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found 😭.', () => {
    renderWithRouter(<NotFound />);
    const heading = document.querySelector('h2');
    expect(heading.tagName.toLowerCase()).toBe('h2');    
    expect(heading.innerHTML).toBe('Page requested not found<span role=\"img\" aria-label=\"Crying emoji\"> 😭</span>');     
  });
  
  it('Teste se página mostra a imagem notFound', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');   
  });

});
