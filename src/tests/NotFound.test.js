import React from 'react';
import { render } from '@testing-library/react';
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

  test('if the page not found render when the using a not existing path', () => {
    const { getByText } = render(<NotFound />);
    const notFoundMessage = getByText(/Page requested not found/i);
    expect(notFoundMessage).toBeInTheDocument();
  });
});
