import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../components/NotFound';

afterEach(cleanup);

describe('testing the NotFound page', () => {
  test(`the page has a h2 heading with the text 
    "Page requested not found 😭"`, () => {
    render(<NotFound />,
      { wrapper: MemoryRouter });
    const heading = screen.getByText(/Page requested not found/i);
    expect(heading).toBeInTheDocument();
  });

  test('the page has a "crying Pikachu image"', () => {
    const { container } = render(<NotFound />);
    const image = container.querySelector(
      '[src = "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"]',
    );
    expect(image).toBeInTheDocument();
  });
});
