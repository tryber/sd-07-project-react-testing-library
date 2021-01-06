import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

test('Testa se a página contém as informações sobre a Pokédex.', () => {
  const { queryByText } = renderWithRouter(<About />);

  const pokeInfo = queryByText(/This application simulates a Pokédex/i);
  expect(pokeInfo).toBeInTheDocument();
});

test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
  const { queryByRole, queryByText } = renderWithRouter(<About />);

  const heading = queryByRole('heading');
  expect(heading).toBeInTheDocument();

  const headingText = queryByText('About Pokédex');
  expect(headingText).toBeInTheDocument();
});

test('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  const { container } = renderWithRouter(<About />);
  const totalParagraphs = 2;

  const paragraphCount = container.querySelectorAll('p');
  expect(paragraphCount.length).toBe(totalParagraphs);
});

test('testa se a página contém a imagem de uma pokédex', () => {
  const { getByRole } = render(<About />);
  const image = getByRole('img');

  expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
