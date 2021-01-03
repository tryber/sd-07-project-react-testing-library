import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testing "Not Found" webpage', () => {
  it('page displays a heading containing the text "Page requested not found 😭"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const expectedText = /page requested not found 😭/i;
    expect(getByRole('heading')).toHaveTextContent(expectedText);
  });
  it('page displays an image', () => {
    const { container } = renderWithRouter(<NotFound />);
    const expectedImageUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = container.querySelector('img');
    expect(image).toHaveAttribute('src', expectedImageUrl);
  });
});
