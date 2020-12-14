import React from 'react';
import About from '../components/About';
import RenderWithRouter from './RenderWithRouter';

describe('Testando o arquivo About.js', () => {
  test('A página contém as informações sobre a Pokédex.', () => {
    const { getByText } = RenderWithRouter(<About />);
    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  });
  test('A página contém um heading com o texto "About Pokédex."', () => {
    const { getByRole } = RenderWithRouter(<About />);
    const heading = getByRole('heading');
    expect(heading.innerHTML).toBe('About Pokédex');
  });
  test('A página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getByText } = RenderWithRouter(<About />);
    const text1 = getByText(/this application simulates a pokédex/i);
    const text2 = getByText(/one can filter pokémons by type/i);
    expect(text1).toBeInTheDocument();
    expect(text2).toBeInTheDocument();
  });
  test('A página contém imagem de uma Pokédex.', () => {
    const { getByRole } = RenderWithRouter(<About />);
    const image = getByRole('img');
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  })