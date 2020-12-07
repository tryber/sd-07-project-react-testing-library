import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

afterEach(cleanup);

test('page must have Pokedex info', () => {
  const { getByText } = renderWithRouter(<About />);
  const aboutInfo = getByText(/This application simulates a Pokédex/i);
  expect(aboutInfo).toBeInTheDocument();
});
test('page must contain heading with text "About Pokédex"', () => {
  const { getByText } = renderWithRouter(<About />);
  const heading = getByText(/About Pokédex/i);
  expect(heading).toBeInTheDocument();
  expect(heading.tagName.toLowerCase()).toBe('h2');
});
test('page must contain contain two paragraphs with text about Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);
  const p1 = getByText(/This application simulates a Pokédex/i);
  const p2 = getByText(/One can filter Pokémons by type/i);
  expect(p1).toBeInTheDocument();
  expect(p1.tagName.toLowerCase()).toBe('p');
  expect(p2).toBeInTheDocument();
  expect(p2.tagName.toLowerCase()).toBe('p');
});
test('page must contain image of a Pokédex', () => {
  const { getByAltText } = renderWithRouter(<About />);
  const img = getByAltText('Pokédex');
  const URL = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src', URL);
});
