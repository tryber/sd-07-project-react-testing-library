import React from 'react';
import renderWithRouter from '../helper/testRouterHelper';
import About from '../components/About';

describe('Testando o arquivo About.js', () => {
  it('deve conter informações da pokedex', () => {
    const { getByText } = renderWithRouter(<About />);

    const infoPokedex = getByText(/This application simulates a Pokédex,/i);
    expect(infoPokedex).toBeInTheDocument();
  });

  it('deve possuir o título', () => {
    const { getByText } = renderWithRouter(<About />);

    const heading = getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  it('deve possuir dois Parágrafos sobre pokedéx', () => {
    const { getByText } = renderWithRouter(<About />);

    const paragraphOne = getByText(/This application simulates a Pokédex/i);
    const paragraphTwo = getByText(/One can filter/i);
    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
    expect(paragraphOne.tagName).toBe('P');
    expect(paragraphTwo.tagName).toBe('P');
  });

  it('deve possuir a imagem de uma pokedex', () => {
    const { getByRole } = renderWithRouter(<About />);

    const image = getByRole('img');
    const srcExpected = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toBe(srcExpected);
  });
});
