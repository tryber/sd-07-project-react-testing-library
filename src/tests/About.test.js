import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

test('information about pokedex', () => {
  const { getByText } = renderWithRouter(<About />);

  expect(getByText(/About Pokédex/i)).toBeInTheDocument();
});

test('heading text', () => {
  const { getByTestId } = renderWithRouter(<About />);

  const headingText = getByTestId('headerText');
  expect(headingText).toBeInTheDocument();
});

test('two paragraphs', () => {
  const { getByTestId } = renderWithRouter(<About />);

  expect(getByTestId('p1')).toBeInTheDocument();
  expect(getByTestId('p2')).toBeInTheDocument();
});

test('pokedex image', () => {
  const { getByTestId } = renderWithRouter(<About />);

  const image = getByTestId('pokedex-image');
  expect(image.src).toBe(
    'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  );
});
