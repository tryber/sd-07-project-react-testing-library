import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import About from '../components/About';

afterEach(cleanup);

describe('second requirement', () => {
  it('should render Pokédex informations', () => {
    render(<About />);

    const pokedexInfo = screen.getByText(/This application simulates a Pokédex/i);
    expect(pokedexInfo).toBeInTheDocument();
  });

  it('should render an heading `h2` with the text `About Pokédex`', () => {
    render(<About />);

    const title = screen.getByText(/about pokédex/i);
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H2');
    expect(title.innerHTML).toBe('About Pokédex');
  });

  it('should render two paragraphs of informations', () => {
    render(<About />);

    const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
    const secondParagraph = screen.getByText(/One can filter Pokémons by type/i);
    expect(firstParagraph).toBeInTheDocument();
    expect(firstParagraph.tagName).toBe('P');

    expect(secondParagraph).toBeInTheDocument();
    expect(secondParagraph.tagName).toBe('P');
  });

  it('should render the pokedex image', () => {
    render(<About />);

    const imagePath = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(imagePath);
  });
});
