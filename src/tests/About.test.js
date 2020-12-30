import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Testing About.js', () => {
  test('renders with the about page`s content', () => {
    const { getByText } = render(<About />);

    expect(getByText(/This application simulates a Pokédex,/i)).toBeInTheDocument();
  });

  test('renders a h2 with the text `About Pokédex`', () => {
    const { getByText } = render(<About />);

    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  test('renders 2 `p`', () => {
    render(<About />);

    const p = document.getElementsByTagName('p').length;
    const size = 2;

    expect(p).toBe(size);
  });

  test('renders a specific img', () => {
    render(<About />);

    const imgSrc = document.querySelector('img').src;
    const src = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(imgSrc).toBe(src);
  });
});
