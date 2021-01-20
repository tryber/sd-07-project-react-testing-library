import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando o arquivo `NotFound.js`', () => {
  it('Verifica se há um título `h2` com o texto `Page requested not found`', () => {
    const { getByRole, getByText } = renderWithRouter(<NotFound />);
    const title = getByRole('heading');
    const text = getByText('Page requested not found');
    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  it('Verfica se há ima imagem de um Pikachu chorando', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const images = getAllByRole('img');
    const pikachuCryingGif = images.find((image) => image.src === 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(pikachuCryingGif).toBeInTheDocument();
  });
});
