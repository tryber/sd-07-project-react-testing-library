import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';


describe('testing About.js component', () => {
  test('page should contain pokédex info', () => {
    const { getByText } = render(<About />);
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  it('should contain a h2 header with About Pokédex text', () => {
    const { getByRole } = render(<About />);
    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
  });
});

