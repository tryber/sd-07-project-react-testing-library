import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  const { getByRole } = render(<About />);
  const h2 = getByRole('heading', { name: 'About Pokédex' });
  expect(h2).toBeInTheDocument();
});

it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  const { getByText } = render(<About />);
  const p1 = getByText(/This application simulates a Pokédex/);
  const p2 = getByText(/One can filter Pokémons by type/);
  expect(p1.tagName).toBe('P');
  expect(p2.tagName).toBe('P');
});

it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
  const { getByAltText } = render(<About />);
  const image = getByAltText(/Pokédex/);
  expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
