import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testando o arquivo About.js', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const text1 = getByText('About Pokédex');
    const text2 = getByText(/a digital encliclopedia/);

    expect(text1).toBeInTheDocument();
    expect(text2).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex;', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', { level: 2 });

    expect(heading).toBeDefined();
    expect(heading.innerHTML).toBe('About Pokédex');
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
    const { queryAllByText } = renderWithRouter(<About />);
    const texts = queryAllByText(/Poké/);

    const ptexts = texts.filter((text) => text.tagName === 'P');

    const dois = 2;
    expect(ptexts.length).toBe(dois);
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const img = getByAltText('Pokédex');

    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
