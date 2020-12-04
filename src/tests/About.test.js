import React from 'react';
import { cleanup } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

afterEach(cleanup);

it(`Teste se a página contém 
  as informações sobre a Pokédex.`, () => {
  renderWithRouter(<About />);
  expect(screen.getByText(/This application simulates a Pokédex/i)).toBeInTheDocument();
});

it(`Teste se a página contém um heading
  h2 com o texto About Pokédex.`, () => {
  renderWithRouter(<About />);
  expect(screen.getByRole('heading')).toHaveTextContent(/about pokédex/i);
});

it(`Teste se a página contém dois parágrafos
    com texto sobre a Pokédex.`, () => {
  const { container } = renderWithRouter(<About />);
  const QUANTITY_PARAGRAPH = 2;
  expect(container.querySelectorAll('p').length).toBe(QUANTITY_PARAGRAPH);
});

it(`Teste se a página contém a seguinte imagem de uma Pokédex: 
    https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.`, () => {
  renderWithRouter(<About />);
  expect(screen.getByRole('img').src)
    .toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
