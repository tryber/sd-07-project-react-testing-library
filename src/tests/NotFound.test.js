import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testing "NotFound.js" file:', () => {
  it(`Should contain a h2 heading with the text
  "Page requested not found 😭"`, () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/not/found');
    const noMatch = screen.getByText('Page requested not found');
    expect(noMatch).toBeInTheDocument();
  });

  it('Should exhibit a specific image', () => {
    const source = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    renderWithRouter(<NotFound />);
    const alt = 'Pikachu crying because the page requested was not found';
    const img = screen.getByAltText(alt);
    expect(img.src).toBe(source);
  });
});
