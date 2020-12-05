import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';

describe('Testing App.js', () => {
  it('Shoul render initial page Po', () => {
    const { getByText } = RenderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
})
});
