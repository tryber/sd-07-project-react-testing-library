import React from 'react';
import { cleanup } from '@testing-library/react';
import NotFound from '../components/NotFound';
import RenderWithRouter from './RenderWithRouter';

afterEach(cleanup);

test('if page contains an h2 heading with the text Page requested not found 😭', () => {
  const { container } = RenderWithRouter(<NotFound />);
  const h2 = container.querySelector('h2');
  expect(h2).toBeInTheDocument();
  expect(h2.textContent).toBe('Page requested not found 😭');
});

test('if page shows the image https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  const { container } = RenderWithRouter(<NotFound />);
  const img = container.querySelector('img');
  expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
