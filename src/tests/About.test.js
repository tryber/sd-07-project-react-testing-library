import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('se a página contém as informações sobre a Pokédex.', () => {
  const { getByText } = render(<About />);
  const aboutInfo = getByText(/This application simulates a Pokédex/i);
  expect(aboutInfo).toBeInTheDocument();
});

test('se a página contém um heading h2 com o texto About Pokédex', () => {
  const { getByText, getByRole } = render(<About />);
  const textH2 = getByText('About Pokédex');
  const tagH2 = getByRole('heading');
  expect(tagH2).toBeInTheDocument();
  expect(textH2).toHaveTextContent('About Pokédex');
});

test('se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  const length = 2;
  const { container } = render(<About />);
  const allP = container.querySelectorAll('p');
  expect(allP.length).toBe(length);
});

test('se a página contém a seguinte imagem de uma Pokédex', () => {
  const { container } = render(<About />);
  const img = container.querySelector('img');
  expect(img).toBeInTheDocument();
  expect(img.getAttribute('src')).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
