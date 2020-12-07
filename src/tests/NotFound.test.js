import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('testa se a página contém um título com o texto "Page requested not found"', () => {
  const { getByText, getByAltText } = render(<NotFound />);

  const text = getByText(/Page requested not found/i);
  expect(text).toBeInTheDocument();

  const img = getByAltText(/Pikachu crying because the page requested was not found/i);
  expect(img).toBeInTheDocument();
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
