import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('testing About page', () => {
  it('Test whether a page contains information about a Pokédex.', () => {
    const { getByText } = render(<About />);
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  it('Test if the page contains an h2 header with the text About Pokédex.', () => {
    const { getByRole } = render(<About />);
    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  // Auxilio do stackoverflow 'Get by HTML element with React Testing Library?' p/ resolver
  it('Test if the page contains two paragraphs with text about Pokédex.', () => {
    const { container } = render(<About />);
    const paragraphs = container.querySelectorAll('p');
    const plength = 2;
    expect(paragraphs.length).toBe(plength);
  });

  it('Test if the page contains a Pokédex image', () => {
    const { getByAltText } = render(<About />);
    const image = getByAltText('Pokédex').src;
    const url = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image).toBe(url);
  });
});
