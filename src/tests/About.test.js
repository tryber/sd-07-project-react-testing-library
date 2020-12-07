import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testando o arquivo About.js', () => {
  it('A página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const heading = getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('A página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getAllByTestId } = renderWithRouter(<About />);
    const paragraphs = getAllByTestId('paragraph');
    const totalParagraphs = 2;
    expect(paragraphs.length).toBe(totalParagraphs);
  });

  it('A página contém a seguinte imagem de uma Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const img = getByAltText('Pokédex');
    expect(img.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
