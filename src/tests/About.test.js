import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('se a página contém as informações sobre a Pokédex.', () => {
  const { getByText } = render(<About />);
  const about = getByText(/This application simulates a Pokédex/i);
  expect(about).toBeInTheDocument();
});

test('se a página contém um heading h2 c/ texto About Pokedéx', () => {
  const { getByRole } = render(<About />);
  const h2 = getByRole('heading', { name: 'About Pokédex' });
  expect(h2.tagName).toBe('H2');
});

test('se a página contém da Pokédex', () => {
  const { getByRole } = render(<About />);
  const link = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const img = getByRole('img');
  expect(img.src).toBe(link);
});
