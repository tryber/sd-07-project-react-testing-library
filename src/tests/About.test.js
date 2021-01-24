import React from 'react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

describe('Testando About.js', () => {
  it('testa se a página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const info = getByText('a digital encliclopedia', { exact: false });

    expect(info).toBeInTheDocument();
  });
  it('testa se a página contém um "h2" contendo "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);
    const heading = getByRole('heading', { level: 2 });

    expect(heading).toHaveTextContent('About Pokédex');
  });
  it('testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const paragraphs = container.querySelectorAll('p');
    const count = 2;

    expect(paragraphs).toHaveLength(count);
  });
  it('testa se a página contém uma imagem específica de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const IMAGE = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImage = getByRole('img', { src: IMAGE }).src;

    expect(pokedexImage).toBe(IMAGE);
  });
});
