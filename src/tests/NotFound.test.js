import React from 'react';
import { cleanup } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../helpers/renderWithRouter';

afterEach(cleanup);

describe('Testing the NotFound.js file', () => {
  it('the page contains an h2 heading with the text Encountered Pokémon', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const text = getByText('Page requested not found');

    expect(text).toBeInTheDocument();
  });
  it('Test if page shows an image', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const image = getAllByRole('img')[1];

    expect(image).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
