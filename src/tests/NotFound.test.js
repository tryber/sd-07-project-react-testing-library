import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Tests the elements of the NotFound.js component', () => {
  it('tests the messege `Page requested not found`', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const title = getByText(/Page requested not found/);
    expect(title).toBeInTheDocument();
  });

  it('tests whether the page shows the Pikachu image', () => {
    const { container } = renderWithRouter(<NotFound />);
    const image = container.querySelector('img');

    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
