import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o arquivo NotFound.js', () => {
  it(`Teste se página contém um heading h2 
  com o texto Page requested not found 😭`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina-que-nao-existe/');
    const h2 = getByText(/Page requested not found/);
    expect(h2.tagName).toBe('H2');
  });

  it(`Teste se página mostra a imagem 
  https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`, () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push('/pagina-que-nao-existe/');
    const image = getByAltText(/Pikachu crying because the page requested was not found/);
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });

});
