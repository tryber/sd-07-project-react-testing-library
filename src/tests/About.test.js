import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

test('se a página contém as informações sobre a Pokedex', () => {
  const { getByText } = renderWithRouter(<About />);
  const textAbout = getByText(/About Pokédex/i);
  expect(textAbout).toBeInTheDocument();
});

test('se a página contém um parágrafos com textos sobre a Pokedex', () => {
  const { getByText } = renderWithRouter(<About />);
  const paragraph1 = getByText(/This application simulates a Pokédex/i);
  const paragraph2 = getByText(/One can filter Pokémons by type/i);
  expect(paragraph1).toBeInTheDocument();
  expect(paragraph2).toBeInTheDocument();
});

test('se a página contém uma imagem específica', () => {
  renderWithRouter(<About />);
  const img = document.querySelector('img');
  expect(img.src).toContain('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
