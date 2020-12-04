import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('tests of NotFound component', () => {
  it('render a heading `h2` with de text `Page requested not found`', () => {
    const { getByRole, getByText } = render(<NotFound />);
    const h2 = getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    const text = getByText(/Page requested not found/i);
    expect(text).toBeInTheDocument();
  });

  it('render a image `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`', () => {
    const { getByAltText } = render(<NotFound />);
    const image = getByAltText(/Pikachu/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
