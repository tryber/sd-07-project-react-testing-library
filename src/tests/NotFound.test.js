import React from 'react';
import { render, cleanup } from '@testing-library/react';
import NotFound from '../components/NotFound';

afterEach(cleanup);

describe('Teste da tela NotFound', () => {
  it('test that there is a rendered h2 title', () => {
    const { getByRole } = render(<NotFound />);

    const title = getByRole('heading');

    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H2');
    expect(title.textContent).toContain('Page requested not found');
  });
  it('test that there is a rendered an image of Not Found page', () => {
    const { getAllByRole } = render(<NotFound />);

    const image = getAllByRole('img');

    expect(image[1]).toBeInTheDocument();
    expect(image[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
