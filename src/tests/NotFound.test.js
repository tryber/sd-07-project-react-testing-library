import React from 'react';
import { render, cleanup } from '@testing-library/react';
import NotFound from '../components/NotFound';

afterEach(cleanup);

test('if the page contains a heading with especific test', () => {
  const { getByText } = render(<NotFound />);

  const noMatchMessage = getByText(/Page requested not found/i);
  expect(noMatchMessage).toBeInTheDocument();
});

test('if the page contains a especific gif of pikachu crying', () => {
  const { getByAltText } = render(<NotFound />);

  const altText = getByAltText(
    /Pikachu crying because the page requested was not found/i,
  );
  expect(altText).toHaveAttribute(
    'src',
    'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
  );
});
