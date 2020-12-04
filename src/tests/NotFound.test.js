import React from 'react';

import { render } from '@testing-library/react';
// import renderWithRouter from './renderWithRouter';
// import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

test('', () => {
  const { container } = render(<NotFound />);
  const img = container.querySelector(
    '[src="https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"]',
  );

  expect(img).toBeInTheDocument();
});
