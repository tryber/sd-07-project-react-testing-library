import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('About must contain infos of Pokédex', () => {
  it('should render an h2 with the `About Pokédex` text inside', () => {
    const { getByText } = renderWithRouter(<About />);
    const h2Title = getByText(/About Pokédex/i);
    expect(h2Title).toBeInTheDocument();
    expect(h2Title.tagName).toBe('H2');
  });

  it('should render two <p> with infos text inside', () => {
    const { getByText } = renderWithRouter(<About />);
    const paragraph1 = getByText(/This application simulates a Pokédex/i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph1.tagName).toBe('P');

    const paragraph2 = getByText(/One can filter Pokémons by type/i);
    expect(paragraph2).toBeInTheDocument();
    expect(paragraph2.tagName).toBe('P');
  });

  it('should render an image from a specific link', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    const link = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toBe(link);
  });
});
