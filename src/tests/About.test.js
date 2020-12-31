import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testando o arquivo About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = render(<About />);
    const text = getByText(/This application simulates a Pokédex/i);
    expect(text).toBeInTheDocument();
  });

  test('Testa se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByRole } = render(<About />);
    const h2 = getByRole('heading', { name: /About Pokédex/i });
    expect(h2.tagName).toBe('H2');
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);
    const p = document.getElementsByTagName('p');
    const paragraphNumber = 2;
    expect(p.length).toBe(paragraphNumber);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
    const { getByRole } = render(<About />);
    const src = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = getByRole('img');
    expect(img.src).toBe(src);
  });
});
