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
    const { getByRole } = render(<NotFound />);

    const h2 = getByRole('heading');

    expect(h2).toBeInTheDocument(/Page requested not found/i);
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getByAltText } = render(<NotFound />);

    const image = getByAltText('Pikachu crying because the page requested was not found');

    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
