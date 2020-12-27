import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testando o arquivo NotFound.js', () => {
  it('A página contém um heading h2 com o texto Page requested not found 😭', () => {
    const { container } = render(<NotFound />);
    const h2 = container.querySelector('h2');
    expect(h2).toHaveTextContent('Page requested not found 😭');
  });
});
