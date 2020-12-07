import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testing "About.js" file:', () => {
  it('Should contain Pokédex info', () => {
    renderWithRouter(<About />);
    const info = screen.getByText('About Pokédex');
    expect(info).toBeInTheDocument();
  });

  it('Should contain heading h2 with text "About Pokédex"', () => {
    renderWithRouter(<About />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2.textContent).toContain('About Pokédex');
  });

  it('Should contain two paragraphs, each one with a specific text about the Pokédex',
    () => {
      renderWithRouter(<About />);
      const text1 = /This application simulates a Pokédex,/i;
      const p1 = screen.getByText(text1);
      expect(p1.tagName.toLowerCase()).toBe('p');

      const text2 = /One can filter Pokémons by type, and see more details for each one/i;
      const p2 = screen.getByText(text2);
      expect(p2.tagName.toLowerCase()).toBe('p');
    });

  it('Should contain a specific image of a Pokédex', () => {
    const source = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    renderWithRouter(<About />);
    const img = screen.getByRole('img', { className: 'pokedex-image' });
    expect(img.src).toBe(source);
  });
});
