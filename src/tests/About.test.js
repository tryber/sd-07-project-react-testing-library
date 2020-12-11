import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

afterEach(cleanup);

describe('Requirement 2: Testing About.js', () => {
  test('if the page contains info about the Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const pokeInfo = getByText(/this application simulates a pokédex/i);
    expect(pokeInfo).toBeInTheDocument();
  });

  test('if there is a text "About Pokédex" wrapped inside a h2 tag', () => {
    const { getByText } = renderWithRouter(<About />);
    const heading = getByText(/about pokédex/i);
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  test('if there are two paragraphs with text about the Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const paragraphOne = getByText(/a digital encliclopedia containing all pokémons/i);
    const paragraphTwo = getByText(/one can filter pokémons by type/i);
    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
    expect(paragraphOne.tagName).toBe('P');
    expect(paragraphTwo.tagName).toBe('P');
  });

  test('if the page contains the specified image', () => {
    const { getByRole } = renderWithRouter(<About />);
    const imgSrc = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImg = getByRole('img');
    expect(pokedexImg).toHaveAttribute('src');
    expect(pokedexImg.src).toBe(imgSrc);
  });
});
