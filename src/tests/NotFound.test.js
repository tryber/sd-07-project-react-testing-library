import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste se a aplicação é redirecionada para a'
+ 'página Not Found ao entrar em uma URL desconhecida.', () => {
  it('Deve renderizar o componente Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/Página/não/encontrada/');

    const noMatch = getByText(/Page requested not found/i);

    expect(noMatch).toBeInTheDocument('About Pokédex');
  });
});
