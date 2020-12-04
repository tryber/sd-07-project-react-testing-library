import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import About from '../components/About';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

test('Page contains info about Pokedex', () => {
  const { getByText } = renderWithRouter(<About />);
  const paragraph = getByText(/This application simulates a Pokédex/i);
  expect(paragraph).toBeInTheDocument();
});

test('Page contains heading h2 with text About Pokedex', () => {
  const { container } = renderWithRouter(<About />);
  const heading = container.querySelector('h2').innerHTML;
  expect(heading).toBe('About Pokédex');
});

test('Page contains heading h2 with text About Pokedex', () => {
  const { container } = renderWithRouter(<About />);
  const paragraphs = container.querySelectorAll('p');
  const numberParagraphs = 2;
  expect(paragraphs.length).toBe(numberParagraphs);
});

test('Page contains image source Pokedex', () => {
  const imageURL = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const { container } = renderWithRouter(<About />);
  const image = container.querySelector('img').src;
  expect(imageURL).toBe(image);
});
