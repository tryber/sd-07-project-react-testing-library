import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

afterEach(cleanup);

describe('forth requirement', () => {
  it('should render an heading H2 with the text `Page requested not found`', () => {
    render(<NotFound />);
    const errorText = screen.getByText(/page requested not found/i);
    const sadEmoji = screen.getByText('😭');
    expect(errorText).toBeInTheDocument();
    expect(sadEmoji).toBeInTheDocument();
  });

  it('should render an image with the path `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`', () => {
    render(<NotFound />);
    const errorImg = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(errorImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
