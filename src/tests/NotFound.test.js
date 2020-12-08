import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Testing NotFound.js file', () => {
  test('the page contains heading with the text `Page requested not found`', () => {
    render(<NotFound />);
    expect(screen.getByRole(
      'heading', { name: 'Page requested not found Crying emoji' },
    ));
  });

  test('the page contains an image', () => {
    render(<NotFound />);
    expect(screen.getByAltText('Pikachu crying because the page requested was not found'))
      .toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
