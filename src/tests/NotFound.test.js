import React from 'react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('Testando o arquivo NotFound.js', () => {
  it('Test if a page contains h2 header with the text Requested page not found', () => {
    const { getByText } = renderWithRouter(<NotFound />);

    const heading = getByText(/Page requested not found/i);
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  it('Test if shows the image https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const images = getAllByRole('img');
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imageElement = images.find((img) => img.src === src);
    expect(imageElement.src).toBe(src);
  });
});
