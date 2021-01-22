import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('4th Req. | NotFound.js', () => {
  it('should render title', () => {
    const { getByText } = render(<NotFound />);
    const title = getByText(/Page requested not found/i);
    const emoji = getByText('😭');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H2');
    expect(emoji).toBeInTheDocument();
  });
  it('should render image', () => {
    const { getByAltText } = render(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
