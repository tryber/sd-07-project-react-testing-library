import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Tests the App screen', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
