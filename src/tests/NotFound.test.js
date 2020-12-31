import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testing NotFound.js', () => {
  test('renders h2 with `Page requested not found 😭`', () => {
    const { getByText } = render(<NotFound />);

    expect(getByText('Page requested not found')).toBeInTheDocument();
  });

  test('renders a specific img', () => {
    render(<NotFound />);

    const imgSrc = document.querySelector('img').src;
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(imgSrc).toBe(src);
  });
});
