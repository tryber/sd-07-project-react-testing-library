import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testando o arquivo About.js', () => {
  test('se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const info = getByText(/About Pokédex/i);
    expect(info).toBeInTheDocument();
  });

  it('se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const title = getByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('About Pokédex');
  });

  it('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const info = getByText(/This application simulates a Pokédex/i);
    const info2 = getByText(/One can filter Pokémons by type/i);
    expect(info).toBeInTheDocument();
    expect(info2).toBeInTheDocument();
  });

  it('se a página contém a imagem de uma Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const image = getByAltText('Pokédex');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
