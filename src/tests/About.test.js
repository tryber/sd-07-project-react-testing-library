import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

test('page contains information about Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);

  expect(getByText(/About Pokédex/i)).toBeInTheDocument();
});

test('page contains an h2 heading with the text About Pokédex', () => {
  const { container } = renderWithRouter(<About />);
  const [h2] = container.getElementsByTagName('h2');

  expect(h2).toBeInTheDocument();
  expect(h2).toHaveTextContent(/About pokédex/i);
});

test('page contains two paragraphs with text about Pokédex', () => {
  const { container } = renderWithRouter(<About />);
  const [p] = container.getElementsByTagName('p');

  expect(p).toBeInTheDocument();
});

test('page contains the following image of a Pokédex', () => {
  const { container } = renderWithRouter(<About />);
  const [img] = container.getElementsByTagName('img');

  expect(img).toBeInTheDocument();
  expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
