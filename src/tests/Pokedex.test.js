import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('testing Pokedex.js', () => {
  test('testing if the page has h2', () => {
    const { getByText } = renderWithRouter(<App />);

    const h2Tag = getByText(/Encountered pokémons/i);
    expect(h2Tag).toBeInTheDocument();
    expect(h2Tag.tagName).toBe('H2');
  });

  test('', () => {
    
  });
});