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

  it('should contain two paragraphs with Pokedex text', () => {
    const { getByText } = render(<About />);
    const firstParagraph =
    'This application simulates a Pokédex, a digital encliclopedia containing all Pokémons';
    const secondParagraph =
    'One can filter Pokémons by type, and see more details for each one of them';
    expect(getByText(firstParagraph)).toBeInTheDocument();
    expect(getByText(secondParagraph)).toBeInTheDocument();
  });
});

