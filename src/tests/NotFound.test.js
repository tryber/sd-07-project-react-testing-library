import React from 'react';
import RenderWithRouter from '../RenderWithRouter';
import NotFound from '../components/NotFound';

describe('tests the use cases for the component NotFound', () => {
  it('should render a h2 heading with `Page requested not found 😭`', () => {
    const { getByText, getByRole } = RenderWithRouter(<NotFound />);
    const heading = getByRole('heading');
    expect(heading.tagName).toBe('H2');
    const message = getByText(/Page requested not found/i);
    expect(heading).toBe(message);
  });

  it('should render a image', () => {
    const { getByAltText } = RenderWithRouter(<NotFound />);
    const image = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(image).toBeInTheDocument();
  });
});
