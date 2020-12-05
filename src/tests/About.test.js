import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

test('whether the page contains information about Pokédex.', () => {
  renderWithRouter(<About />);
  const textAbout = screen.getByText(/This application simulates a Pokédex/i);
  const secondText = screen.getByText(/One can filter Pokémons by type/i);
  expect(textAbout).toBeInTheDocument();
  expect(secondText).toBeInTheDocument();
});

test('se a página contém um heading h2 com o texto About Pokédex', () => {
  renderWithRouter(<About />);
  const titleAbout = screen.getByText(/About Pokédex/i);
  expect(titleAbout).toBeInTheDocument();
});

test('if the page contains the following image of a Pokédex', () => {
  renderWithRouter(<About />);
  const image = screen.getByAltText(/Pokédex/i);
  expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
