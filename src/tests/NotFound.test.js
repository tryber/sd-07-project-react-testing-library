import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Not found page rendering correctly', () => {
  it('should have an h2 with `Page requested not found 😭` text', () => {
    const { container } = renderWithRouter(<NotFound />);
    // https://stackoverflow.com/questions/54593369/
    // unable-to-find-an-element-with-the-text-mytext-error-when-using-react-testing
    const h2Text = container.querySelector('h2');
    expect(h2Text).toBeInTheDocument();
    expect(h2Text).toHaveTextContent('Page requested not found 😭');
  });

  it('should render an specific image from specific link', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    // https://stackoverflow.com/questions/54593369/
    // unable-to-find-an-element-with-the-text-mytext-error-when-using-react-testing
    const image = getByAltText(/Pikachu crying because/i);
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
