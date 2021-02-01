import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
});
