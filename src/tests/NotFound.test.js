import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('If have text Page requested not found 😭 on the page', () => {
  const { getByRole } = render(<NotFound />);
  expect(getByRole('heading').textContent).toBe('Page requested not found 😭');
});
// scr test using cotainer
// test('If have image according to requested', () => {
//   const { container } = render(<NotFound />);
//   const images = container.getElementsByTagName('img');
//   expect(images[0].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
// });
