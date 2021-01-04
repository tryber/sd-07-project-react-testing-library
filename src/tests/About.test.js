import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testando  o link /about', () => {
  it('A página deve conter as informações sobre a Pokédex', () => {
    render(<About />);
    const aboutText = screen.getByText(/This application simulates a Pokédex/i);
    expect(aboutText).toBeInTheDocument();
  });

  it('A página deve conter um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const h2 = screen.getByText(/About Pokédex/i);
    expect(h2).toBeInTheDocument();
    expect(h2.tagName).toBe('H2');
  });

  it('A página deve conter dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);
    const p1 = screen.getByText(/This application simulates a Pokédex, a digital/i);
    const p2 = screen.getByText(/One can filter Pokémons by type, and see more details/i);
    expect(p1).toBeInTheDocument();
    expect(p1.tagName).toBe('P');
    expect(p2).toBeInTheDocument();
    expect(p2.tagName).toBe('P');
  });

  it('A página deve conter uma imagem específica, de uma Pokédex:', () => {
    render(<About />);
    const imgsrc = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');
    expect(img.src).toBe(imgsrc);
  });
});
// qual query usar?: https://testing-library.com/docs/guide-which-query
