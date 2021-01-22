import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

afterEach(cleanup);
describe('Testando o arquivo About.js', () => {
  it('Verifica se a página contém as informações da Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const title = getByText('About Pokédex');
    expect(title).toBeInTheDocument();
  });

  it('Verifica se há um título `h2` com o texto `About Pokédex`', () => {
    const { getByRole } = renderWithRouter(<About />);
    const title = getByRole('heading');
    expect(title).toBeInTheDocument();
  });

  it('Verifica se a página contém dois parágrafos sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const paragraph1 = getByText(/This application simulates a Pokédex/);
    const paragraph2 = getByText(/One can filter Pokémons by type/);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('Verifica se a página contém uma imagem com uma url específica', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    const url = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toBe(url);
  });
});
