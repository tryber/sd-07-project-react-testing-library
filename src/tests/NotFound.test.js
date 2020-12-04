import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('notFound', () => {
  it('test notFound', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/xablau');
    const about = getByText('Page requested not found');
    expect(about).toBeInTheDocument();
  });

  it('test imagem', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    const srcimagem = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    history.push('/xablau');
    const no = getByAltText('Pikachu crying because the page requested was not found');
    expect(no.src).toEqual(srcimagem);
  });
});
