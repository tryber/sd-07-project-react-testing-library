import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testing About.js', () => {
  test('renders with the about page`s content',() => {
    const { getByText } = renderWithRouter(<About />);
  
    expect(getByText('This application simulates a Pokédex, a digital encliclopedia containing all Pokémons')).toBeInTheDocument();
  });

  test('renders a h2 with the text `About Pokédex`', () => {
  const { getByText } = renderWithRouter(<About />);

  expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  test('renders 2 `p`', () => {
    renderWithRouter(<About />);

    const p = document.getElementsByTagName("p").length;

    expect(p).toBe(2);
  });

  test('renders a specific img', () => {
    renderWithRouter(<About />);

    const imgSrc = document.querySelector('img').src;
    const src = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(imgSrc).toBe(src);
  });
});
