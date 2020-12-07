import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testando NotFound', () => {
  it('Teste se página contém um h2 com o texto Page requested not found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/rota/errada');
    const h2 = getByText('Page requested not found');
    expect(h2).toBeInTheDocument();
  });

  it('Testa se a página tem a imagem', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push('/rota/errada');
    const imagem = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(imagem.src).toEqual(
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
