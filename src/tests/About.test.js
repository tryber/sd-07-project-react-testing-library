import { cleanup, render } from '@testing-library/react';
import React from 'react';
import About from '../components/About';

afterEach(cleanup);
describe('Testando o arquivo About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = render(<About />);
    const aboutText = getByText(/About Pokédex/i);
    expect(aboutText).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByRole } = render(<About />);
    const aboutText = getByRole('heading');
    expect(aboutText.innerHTML).toBe('About Pokédex');
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = render(<About />);
    const aboutP1 = getByText(/This application simulates a Pokédex,/);
    expect(aboutP1).toBeInTheDocument();
    const aboutP2 = getByText(/One can filter Pokémons by type,/);
    expect(aboutP2).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex.', () => {
    const { getByRole } = render(<About />);
    const aboutImg = getByRole('img');
    const url = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(aboutImg.src).toBe(url);
  });
});
