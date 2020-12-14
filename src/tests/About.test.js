import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testing About.js - requirement2', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const about = getByText('About Pokédex');
    expect(about).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('About Pokédex');
    expect(heading.tagName).toBe('H2');
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const p1 = getByText(/This application simulates a Pokédex/i);
    const p2 = getByText(/One can filter/i);
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
    expect(p1.tagName).toBe('P');
    expect(p2.tagName).toBe('P');
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    const { getByRole } = renderWithRouter(<About />);
    const img = getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
