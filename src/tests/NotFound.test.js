import React from 'react';
import { render } from '@testing-library/react';
import { NotFound } from '../components';

describe('testing NotFound.js Checks if:', () => {
  test('there is a heading whith message "Page requested not found 😭"', () => {
    const { container, getByText, getByRole } = render(<NotFound />);
    const heading = getByRole(/heading/i);
    expect(heading).toBeInTheDocument();
    const tagH2 = container.querySelectorAll('h2');
    expect(tagH2).toHaveLength(1);
    const subTitle = getByText(/(Page) (requested) (not found)/i);
    expect(subTitle).toBeInTheDocument();
  });

  test('the page shows CryingPikachu image.', () => {
    const { container, getByRole } = render(<NotFound />);
    const img = getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(img).toBeInTheDocument();
    const imgSrc = container.querySelector('img').src;
    expect(imgSrc).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
