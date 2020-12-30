import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('if renders a h2 element with the text `About Pokédex`', () => {
  const { getByRole } = render(<About />);
  const heading = getByRole('heading');
  expect(heading).toBeInTheDocument();
  expect(heading.tagName).toBe('H2');
  expect(heading).toHaveTextContent('About Pokédex');
});

test('if renders two paragraph elements with pokedex info', () => {
  const { container } = render(<About />);
  const expectedLenght = 2;
  const paragraphs = container.querySelectorAll('p');
  expect(paragraphs).toHaveLength(expectedLenght);
});

test('if renders a image element of pokedex', () => {
  const { getByRole } = render(<About />);
  const expectedPath = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const image = getByRole('img');
  expect(image.src).toBe(expectedPath);
});
