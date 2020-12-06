import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Requiriment 02', () => {
  test('1/4', () => {
    renderWithRouter(<About />);

    const aboutMessage = screen.getByText(
      /this application simulates a pokédex, a digital encliclopedia containing all pokémons/i
    );

    expect(aboutMessage).toBeInTheDocument();
  });

});
