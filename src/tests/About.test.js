import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('2. Testando o arquivo About.js', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const emptyArray = 0;

    const info = screen.queryAllByText(/pokédex/i);
    expect(info).not.toHaveLength(emptyArray);
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);

    const pageTitle = screen.getByText(/About Pokédex/i);
    expect(pageTitle).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const childrenOfSection = 3;

    const title = screen.getByText('About Pokédex');
    const section = title.nextElementSibling;
    const paragraphs = section.children;

    expect(paragraphs).toHaveLength(childrenOfSection);
    expect(paragraphs[0].tagName).toBe('P');
    expect(paragraphs[1].tagName).toBe('P');
    expect(paragraphs[2].tagName).not.toBe('P');
  });

  it(
    'Teste se a página contém a seguinte imagem de uma Pokédex: '
    + 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex'
    + '.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
      renderWithRouter(<About />);

      const image = screen.getByAltText(/Pokédex/i);

      expect(image).toBeInTheDocument();
      expect(image.src).toBe(
        'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_'
        + 'Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
      );
    },
  );
});
