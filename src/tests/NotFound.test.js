import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('check if `Not Found` component is working correctly', () => {
  it('check if `Not Found` has an h2 tag with the text `Page request not found`', () => {
    const { getByText } = render(<NotFound />);
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
    expect(noMatch.tagName).toBe('H2');
  });

  it('check `Not Found` image link', () => {
    const { getByAltText } = render(<NotFound />);
    const image = getByAltText(/Pikachu crying because the page requested was not found/i);
    const imageLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif'
    expect(image.src).toBe(imageLink);
  });
});

