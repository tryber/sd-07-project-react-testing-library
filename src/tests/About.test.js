import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import About from '../components/About';

describe('Testando o arquivo About.js, requisito 2', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const about = getByText(/This application simulates a Pokédex,/i);
    expect(about).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const heading = document.querySelector('h2');
    expect(heading.tagName.toLowerCase()).toBe('h2');
    expect(heading.innerHTML).toBe('About Pokédex');
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const two = 2;
    const paragraphy = document.querySelectorAll('p').length;
    expect(paragraphy).toBe(two);
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const image = getByAltText(/Pokédex/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
