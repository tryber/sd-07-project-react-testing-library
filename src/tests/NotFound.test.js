import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('testing file NotFound.js', () => {
  test('if the page contain a img NotFound Pokédex', () => {
    const { queryAllByRole } = render(<NotFound />);
    const notFoundImg = queryAllByRole('img', {
      src:
        'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    });
    expect(notFoundImg[1]).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});