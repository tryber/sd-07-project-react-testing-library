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
});
