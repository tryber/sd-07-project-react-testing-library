import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('4 - Testando o arquivo NotFound.js', () => {
  test('4.2 - Teste se página contém um heading h2 - Page requested not found;', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/notfound');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
  it('4.3 - Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    const { getAllByRole, history } = renderWithRouter(<App />);
    history.push('/notfound');
    const image = getAllByRole('img');
    expect(image[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
