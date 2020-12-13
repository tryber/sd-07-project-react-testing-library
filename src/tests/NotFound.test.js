import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import NotFound from '../components/NotFound';

test('if Not Found page has the heading with the message', () => {
  renderWithRouter(<NotFound />);

  const notfoundMessage = screen.getByText(/Page requested not found/);

  expect(notfoundMessage).toBeInTheDocument();
});

test('if NotFound renders an image', () => {
  renderWithRouter(<NotFound />);

  const image = screen.getByAltText(
    'Pikachu crying because the page requested was not found',
  );

  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
