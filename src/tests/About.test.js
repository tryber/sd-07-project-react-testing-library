import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

it('Verifica a página About contém uma tag h2 com o texto: About Pokédex ', () => {
  const { getByText } = renderWithRouter(<About />);

  const heading = getByText(/About Pokédex/);
  expect(heading).toBeInTheDocument();
});

it('Verifica se a página About contém imagem de uma Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);

  const srcImgToFind = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const image = getByRole('img');
  expect(image.src).toBe(srcImgToFind);
});
