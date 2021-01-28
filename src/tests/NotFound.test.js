import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Page must have a heading h2 with text Page requested not found', () => {
  const { getByRole } = render(<NotFound />);
  const h2 = getByRole('heading');
  expect(h2).toBeInTheDocument();
  expect(h2.textContent).toBe('Page requested not found 😭');
  expect(h2.tagName).toBe('H2');
});

test('Page must show the following img https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  const history = createMemoryHistory();
  const { getByAltText } = render(
    <Router history={ history }>
      <NotFound />
    </Router>,
  );
  const image = getByAltText(/Pikachu crying because the page requested was not found/i);
  expect(image).toBeInTheDocument();
  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
