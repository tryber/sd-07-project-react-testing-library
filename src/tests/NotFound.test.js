import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { NotFound } from '../components';

describe('Teste se a aplicação é redirecionada para a'
+ 'página Not Found ao entrar em uma URL desconhecida.', () => {
  it('Deve renderizar o componente Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/Página/não/encontrada/');

    const noMatch = getByText(/Page requested not found/i);

    expect(noMatch).toBeInTheDocument('About Pokédex');
  });
});

describe('Testando o arquivo NotFound.js', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    const { getByText } = render(<NotFound />);

    const h2 = getByText(/Page requested not found 😭/i);

    expect(h2).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getAllByRole } = render(<NotFound />);

    const image = getAllByRole('img', { src: 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif' });

    expect(image[1]).toBeInTheDocument();
  });
});
