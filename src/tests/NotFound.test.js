import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testing "NotFound.js" file:', () => {
  it(`Should contain a h2 heading with the text
  "Page requested not found 😭"`, () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/not/found');
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    expect(h2.textContent).toContain('Page requested not found');
  });

  it('Should exhibit a specific image', () => {
    const source = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    renderWithRouter(<NotFound />);
    const alt = 'Pikachu crying because the page requested was not found';
    const img = screen.getByAltText(alt);
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(source);
  });
});
