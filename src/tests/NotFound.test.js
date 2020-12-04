import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('renders the NotFound screen', () => {
  it('renders the not found info', () => {
    render(<NotFound />, { wrapper: MemoryRouter });

    const notFoundText = screen.getByText(/Page requested not found/i);
    expect(notFoundText.tagName.toLowerCase()).toBe('h2');

    const gif = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    const gifSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(gif.src).toBe(gifSrc);
  });
});
