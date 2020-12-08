import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('Testa se a página contém h2 com About Pokédex', () => {
  const { getByText } = render(<About />);
  const h2Content = getByText(/About Pokédex/i);
  expect(h2Content).toBeInTheDocument();
});

test('Testa se a página contém a imagem correta', () => {
  const { getByAltText } = render(<About />);
  const img = getByAltText('Pokédex');
  expect(img).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
