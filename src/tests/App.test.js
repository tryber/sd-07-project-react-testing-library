import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import { fireEvent } from '@testing-library/react';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />)
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});
