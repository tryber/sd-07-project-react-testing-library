import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('If page have Pokedéx information', () => {
  const { getByTestId } = render(<About />);
  expect(getByTestId('pokedex-info')).toBeInTheDocument();
});

test('If page have a heading with text About Pokédex', () => {
  const { getByRole } = render(<About />);
  expect(getByRole('heading').textContent).toBe('About Pokédex');
});

test('If have two paragraphs with Pokédex content', () => {
  const length = 2;
  const { getAllByTestId } = render(<About />);
  expect(getAllByTestId('pokedex-content').length).toBe(length);
});

test('If page have an image defined', () => {
  const imgMockPath = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const { getByRole } = render(<About />);
  expect(getByRole('img').src).toBe(imgMockPath);
});
