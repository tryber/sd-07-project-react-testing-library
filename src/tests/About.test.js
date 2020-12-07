import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

test('testa se a página contém um heading com o texto About Pokédex', () => {
  const { getByText, getByAltText } = renderWithRouter(<About />);

  const heading = getByText(/About Pokédex/i);
  expect(heading).toBeInTheDocument();

  const img = getByAltText(/Pokédex/i);
  expect(img).toBeInTheDocument();
  expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
