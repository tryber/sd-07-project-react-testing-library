import React from 'react';
import { cleanup } from '@testing-library/react';
import NotFound from '../components/NotFound';
import RenderWithRouter from './RenderWithRouter';

afterEach(cleanup);

test('if the page contains an h2 heading with the text About Pokédex', () => {
  const { container } = RenderWithRouter(<NotFound />);
  const h2 = container.querySelector('h2');
  expect(h2).toBeInTheDocument();
  expect(h2.textContent).toBe('Page requested not found 😭');
});

test('if the page contains the following image of a Pokédex', () => {
  const { container } = RenderWithRouter(<NotFound />);
  const img = container.querySelector('img');
  expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
