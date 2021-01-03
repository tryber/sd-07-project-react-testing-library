import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('testing NotFound.js component', () => {
  it('should contain a heading with Page requested not found text', () => {
    const { getByText } = render(<NotFound />);
    expect(getByText('Page requested not found')).toBeInTheDocument();
    expect(getByText('😭')).toBeInTheDocument();
  });
});