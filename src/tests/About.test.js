import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

// Teste se a página contém as informações sobre a Pokédex.
test('if about contains pokedex information', () => {
  const { getByText } = renderWithRouter(<About />);
  const about = getByText(/About Pokédex/i);
  expect(about).toBeInTheDocument();
});
// Teste se a página contém um heading h2 com o texto About Pokédex.
test('if about contains pokedex information', () => {
  const { container } = renderWithRouter(<About />);
  const [h2] = container.getElementsByTagName('h2');
  expect(h2).toHaveTextContent('About Pokédex');
});
// Teste se a página contém dois parágrafos com texto sobre a Pokédex.
test('if about contains pokedex information', () => {
  const { container } = renderWithRouter(<About />);
  const p = container.getElementsByTagName('p');
  expect(p[0]).toHaveTextContent(
    `This application simulates a Pokédex,
     a digital encliclopedia containing all Pokémons`,
  );
  expect(p[1]).toHaveTextContent(
    'One can filter Pokémons by type, and see more details for each one of them',
  );
});
// Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.
test('if about contains pokedex information', () => {
  const { container } = renderWithRouter(<About />);
  const [img] = container.getElementsByTagName('img');
  expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
