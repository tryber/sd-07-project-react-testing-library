import React from 'react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Testando o componente NotFound', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/rota/error');
    const procurandoH2 = getByText('Page requested not found');
    expect(procurandoH2).toBeInTheDocument();
  });

  it('Testa se a página tem imagem', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push('/rota/error');
    const imagem = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(imagem.src).toEqual(
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
