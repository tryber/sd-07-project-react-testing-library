import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Requisito 2', () => {
  test('verifica se a página contém um h2 com um texto', () => {
    const { getByText } = renderWithRouter(<About />);
    const paragraph = getByText('About Pokédex');
    expect(paragraph).toBeInTheDocument();
  });
  test('verifica se a página contém uma imagem', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const image = getByAltText('Pokédex');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
  test('verifica se há 2 h2 na página', () => {
    const { getByText } = renderWithRouter(<About />);
    const txt1 = getByText(/This application simulates a Pokédex/i);
    const txt2 = getByText(/One can filter Pokémons by type, and/i);
    expect(txt1).toBeInTheDocument();
    expect(txt2).toBeInTheDocument();
  });
});
