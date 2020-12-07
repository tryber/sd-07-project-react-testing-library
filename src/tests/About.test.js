import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

test('The page contains information about Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);
  const information = getByText(/About Pokédex/i);
  expect(information).toBeInTheDocument();
});

test('Contains an h2 heading with the text About Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const title = getByRole('heading');
  expect(title).toHaveTextContent('About Pokédex');
});

test('The page contains two paragraphs', () => {
  const { container } = renderWithRouter(<About />);
  const two = 2;
  const paragraphs = container.getElementsByTagName('p');
  expect(paragraphs.length).toBe(two);
});

test('page contains the image of a Pokédex', () => {
  const { container } = renderWithRouter(<About />);
  const [img] = container.getElementsByClassName('pokedex-image');
  expect(img).toBeInTheDocument();
  expect(img.src).toBe(
    'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  );
});
