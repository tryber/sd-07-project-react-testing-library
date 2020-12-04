import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Requisito 2', () => {
  test('renders a heading with the text `About Pokédex`', () => {
    const { getByText } = renderWithRouter(<About />);
    const heading = getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });
  test('renders a heading with the text `About Pokédex`', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const image = getByAltText(/Pokédex/i);
    expect(image.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
  test('renders a heading with the text `About Pokédex`', () => {
    const { getByText } = renderWithRouter(<About />);
    const p1 = getByText(/This application simulates a Pokédex/i);
    const p2 = getByText(
      /One can filter Pokémons by type, and see more details for each one of them/i,
    );
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });
});
