import React from 'react';
import { screen } from '@testing-library/dom';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testando o arquivo About.js', () => {
  test('Se a página contém as informações sobre a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const info = getByText(/This application simulates a Pokédex/i);

    expect(info).toBeInTheDocument();
  });
  test('Se a página contém um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const about = screen.getByRole('heading', { name: /about pokédex/i });

    expect(about).toBeInTheDocument();
  });
  test('Se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { container } = renderWithRouter(<About />);
    const paragraph = container.querySelectorAll('p');
    const two = 2;

    expect(paragraph.length).toBe(two);
  });
  test('', () => {
    const { getByRole } = renderWithRouter(<About />);
    const src = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = getByRole('img', { src });

    expect(img.src).toBe(src);
  });
});
