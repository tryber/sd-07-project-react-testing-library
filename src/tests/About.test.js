import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('testing file About.js', () => {
  test('if the page contain informations about a pokedex', () => {
    const { getByText } = render(<About />);
    const pokedexInformations = getByText(
      /digital encliclopedia containing all Pokémons/i,
    );
    expect(pokedexInformations).toBeInTheDocument();
  });

  test('if the page contain a h2 with text About Pokédex', () => {
    const { getByRole } = render(<About />);
    const headingAbout = getByRole('heading', { level: 2 });
    expect(headingAbout).toHaveTextContent('About Pokédex');
  });

  test('if the page contain 2 paragraphs about Pokédex', () => {
    render(<About />);
    expect(
      screen.getByText(/this application simulates a pokédex/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/one can filter pokémons by type/i),
    ).toBeInTheDocument();
  });
  test('if the page contain a img about Pokédex', () => {
    const { getByRole } = render(<About />);
    const pokedexImg = getByRole('img', {
      src:
        'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    });
    expect(pokedexImg).toBeInTheDocument('About Pokédex');
  });
});
