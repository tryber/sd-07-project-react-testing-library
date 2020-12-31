import React from 'react';
import { getAllByRole, getByText, render } from '@testing-library/react';
import About from '../components/About';

describe('Testando o arquivo About.js', ()  => {
    it('Teste se a página contém as informações sobre a Pokédex.', () => {
      const { getByText } = render(<About />);
      const info = getByText(/This application simulates a Pokédex, a digital encliclopedia containing all Pokémons/i);
      expect(info).toBeInTheDocument();
    });

    it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
      const { getByRole } = render(<About />);
      const element = getByRole('heading', { name: /About Pokédex/i});
      expect(element.tagName).toBe('H2');
    });

    it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
      render(<About />)
      const p = document.getElementsByTagName('p');
      const numberOfParagraph = 2;
      expect(p.length).toBe(numberOfParagraph);
    });

    it('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
      const { getByRole } = render(<About />);
      const src = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
      const img = getByRole('img');
      expect(img.src).toBe(src);
    });
});

