import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Requirement 2 ', () => {
  it('Testing About.js', () => {
    render(<About />, { wrapper: MemoryRouter });
    expect(screen.getByText('About Pokédex').tagName.toLowerCase()).toBe('h2');
    expect(screen.getByText(/This application simulates a Pokédex/i)).toBeInTheDocument();
    expect(screen.getByText(/One can filter Pokémons by type, and/i)).toBeInTheDocument();
    const srcImage = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(screen.getByAltText('Pokédex').src).toBe(srcImage);
  });
});
