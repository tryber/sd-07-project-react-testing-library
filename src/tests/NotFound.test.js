import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('Teste se a aplicação vai para Not Found ao entrar em uma URL N/A.', () => {
  it('texto deve conter page requested not found', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const notFound = getByText('Page requested not found');
    const emoji = getByText(/😭/);
    expect(emoji).toBeInTheDocument();
    expect(notFound).toBeInTheDocument();
  });
});
describe('Contém imagem gif do pikachu?', () => {
  it('Qual o src da imagem', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
