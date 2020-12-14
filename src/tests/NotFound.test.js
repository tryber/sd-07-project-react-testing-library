import React from 'react';
import { render } from '@testing-library/react';
import RenderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Test if there is a text `Page requested not found 😭`', () => {
  it('the `NotFound` page must contain a text indicating that there is no page', () => {
    const { container, getByText } = RenderWithRouter(<NotFound />);
    const tag = container.querySelector('h2');
    expect(getByText('Page requested not found')).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
  });
  it('the `NotFound` must  have a image of a device', () => {
    const { container } = render(<NotFound />);
    const image = container.querySelector('img');
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
