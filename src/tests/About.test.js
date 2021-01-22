import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import About from '../components/About';
import TestingRouter from '../components/TestingRouter';

describe('2nd Req. | Testing About.js', () => {
  it('should render Pokédex informations', () => {
    const { getByText } = render(<About />);
    const pokedexInfo = getByText(/This application simulates a Pokédex/i);
    expect(pokedexInfo).toBeInTheDocument();
  });

  it('should h2 with the text About Pokédex ', () => {
    const { getByText } = render(<About />);
    const title = getByText(/about pokédex/i);
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H2');
  });

  it('should render 2 paragraphs with text about the Pokédex', () => {
    const { getByText } = render(<About />);
    const firstParagraph = getByText(/This application simulates a Pokédex/i);
    const secondParagraph = getByText(/One can filter Pokémons by type/i);
    expect(firstParagraph && secondParagraph).toBeInTheDocument();
    expect((firstParagraph && secondParagraph).tagName).toBe('P');
  });

  it('should render a given image', () => {
    const { getByRole } = render(<About />);
    const image = getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
