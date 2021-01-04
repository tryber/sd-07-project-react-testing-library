import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Requirement 4', () => {
  it('should render an h2 with `Page Requested not Found`', () => {
    render(<NotFound />);
    const notFoundTitle = screen.getByText(/Page requested not found/i);
    expect(notFoundTitle).toBeInTheDocument();
    expect(notFoundTitle.tagName.toLowerCase()).toBe('h2');
  });

  it('should contains an image', () => {
    render(<NotFound />);
    expect(screen.getByAltText('Pikachu crying because the page requested was not found'))
      .toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
