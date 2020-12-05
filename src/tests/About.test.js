import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testing About.js file', () => {
  test('the page contains informations about Pokedex', () => {
    render(<About />);
    expect(screen.getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  test('the page contains heading with the text `About Pokédex`', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: 'About Pokédex' }));
    // .toHaveTextContent('About Pokédex');
  });

  test('the page contains 2 paragraphs about Pokédex', () => {
    render(<About />);
    expect(screen.getByText(
      'This application simulates a Pokédex, '
      + 'a digital encliclopedia containing all Pokémons',
    )).toBeInTheDocument();
    expect(screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    )).toBeInTheDocument();
  });

  test('the page contains an image of a Pokédex', () => {
    render(<About />);
    expect(screen.getByAltText('Pokédex'))
      .toHaveAttribute('src',
        'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/'
        + '800px-Gen_I_Pok%C3%A9dex.png');
  });
});
