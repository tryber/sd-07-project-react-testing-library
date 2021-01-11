import { getByAltText } from '@testing-library/react';
import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

test('information about pokedex', () => {
  const { getByText } = renderWithRouter(<About />);

  expect(getByText(/About Pokédex/i)).toBeInTheDocument();
});

test('heading text', () => {
  const { getByRole } = renderWithRouter(<About />);

  expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
});

test('two paragraphs', () => {
  const { container } = renderWithRouter(<About />);

  const paragraph = container.querySelectorAll('p');
  const paragraphLength = 2;
  expect(paragraph.length).toBe(paragraphLength);
});

test('pokedex image', () => {
  const { getByAltText } = renderWithRouter(<About />);

  const image = getByAltText('Pokédex');
  expect(image.src).toBe(
    'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  );
});
