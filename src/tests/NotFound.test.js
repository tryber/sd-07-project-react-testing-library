import React from 'react';
import renderWithRender from '../renderWithRouter';
import App from '../App';

describe('Testando o arquivo NotFound', () => {
  it('Deve renderizar notfound ', () => {
    const { getByText, history, getByAltText } = renderWithRender(<App />);
    history.push('/pagina-nao-existe');
    const { pathname } = history.location;

    expect(pathname).toBe('/pagina-nao-existe');

    const notfound = getByText(/Page requested not found/i);
    expect(notfound.tagName).toBe('H2');

    const imagems = getByAltText(
      'Pikachu crying because the page requested was not found'
    );
    const imagem = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imagems.src).toBe(imagem);
  });
});
