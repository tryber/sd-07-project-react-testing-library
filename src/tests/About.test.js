import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import About from '../components/About';

beforeEach(() => {
  renderWithRouter(<About />);
});

test('if has tha heading "About Pokedex"', () => {
  const heading = screen.getByRole('heading');

  expect(heading).toBeInTheDocument();
  expect(heading).toHaveTextContent('About Pokédex');
});

test('if page contains two paragraphs about Pokedex', () => {
  const firstText = 'This application simulates a Pokédex, '
  + 'a digital encliclopedia containing all Pokémons';
  const secondText = 'One can filter Pokémons by type, '
   + 'and see more details for each one of them';
  const firstParagraph = screen.getByText(firstText);
  const secondParagraph = screen.getByText(secondText);

  expect(firstParagraph).toBeInTheDocument();
  expect(secondParagraph).toBeInTheDocument();
});

test('if image is renderes', () => {
  const image = screen.getByAltText('Pokédex');

  expect(image).toBeInTheDocument();
  expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
