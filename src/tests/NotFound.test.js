import React from 'react';

import { render } from '@testing-library/react';
// import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('NotFound.js tests', () => {
  test('test if not found text is rendered', () => {
    const { getByText } = render(<NotFound />);

    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
  test('', () => {
    const { container } = render(<NotFound />);
    const img = container.querySelector(
      '[src="https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"]',
    );

    expect(img).toBeInTheDocument();
  });
});
