import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('testando o arquivo App', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const informations = getByText(
      /a digital encliclopedia containing all Pokémons/i,
    );
    expect(informations).toBeInTheDocument();
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const about = screen.getByRole('heading', { name: /about pokédex/i });
    expect(about).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
    const { container } = renderWithRouter(<About />);
    const paragrafo = container.querySelectorAll('p');
    const two = 2;
    expect(paragrafo.length).toBe(two);
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const src = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = getByRole('img', {
      src,
    });
    expect(img.src).toBe(src);
  });
});
