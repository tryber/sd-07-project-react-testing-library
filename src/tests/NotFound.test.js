import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requiriment 04', () => {
  test('1/2', () => {
    renderWithRouter(<NotFound />);

    const notFoundTitle = screen.getByText(/page requested not found/i);

    expect(notFoundTitle).toBeInTheDocument();
    expect(notFoundTitle.tagName).toBe('H2');
  });

});
