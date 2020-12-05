import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testando o arquivo About.js', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const pokedex = /digital encliclopedia containing all Pokémons/i;
    expect(getByText(pokedex)).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const heading = /About Pokédex/i;
    expect(getByText(heading)).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstParagraph = /This application simulates a Pokédex, a digital/i;
    const secondParagraph = /One can filter Pokémons by type, and see more details for/i;
    expect(getByText(firstParagraph)).toBeInTheDocument();
    expect(getByText(secondParagraph)).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex...', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
