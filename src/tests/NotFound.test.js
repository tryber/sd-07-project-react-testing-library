import React from 'react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Testing NotFound.js', () => {
  it('Tests if the page have a H2 with content', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina-inexistente');
    const pageNotFound = getByText(/Page requested not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });
  it('Testando se a página contém imagem', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push('/pagina-inexistente');
    const imagem = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(imagem.src).toEqual(
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
