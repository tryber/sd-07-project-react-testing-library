import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('check if `About` component is working correctly', () => {
  it('check if `About` has text `About Pokédex`', () => {
    const { getByText } = render(<About />);
    const aboutPokedex = getByText(/About Pokédex/);
    expect(aboutPokedex).toBeInTheDocument();
  });

  it('check if `About Pokédex` is a `h2`', () => {
    const { getByText } = render(<About />);
    const aboutPokedex = getByText(/About Pokédex/);
    expect(aboutPokedex.tagName).toBe('H2');
  });

  it('check if `About Pokédex` has two `p` elements explaining the pokedéx', () => {
    const { getAllByText } = render(<About />);
    const paragraphs = getAllByText(/Pokémons/i);
    const paragraphsLength = 2;
    expect(paragraphs).toHaveLength(paragraphsLength);
    expect(paragraphs[0].tagName).toBe('P');
    expect(paragraphs[1].tagName).toBe('P');
  });

  it('check pokédex image link', () => {
    const { getByAltText } = render(<About />);
    const image = getByAltText(/Pokédex/);
    const imageLink = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toBe(imageLink);
  });
});
