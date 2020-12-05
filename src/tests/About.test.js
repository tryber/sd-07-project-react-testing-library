import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testing About.js archive', () => {
  test('page contains informations about Pokedex', () => {
    renderWithRouter(<About />);
    expect(screen.getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  test('page contains heading with the text `About Pokédex`', () => {
    renderWithRouter(<About />);
    expect(screen.getByRole('heading', { name: 'About Pokédex' }));
    // .toHaveTextContent('About Pokédex');
  });

  test('page contains 2 paragraphs about Pokédex', () => {
    renderWithRouter(<About />);
    expect(screen.getByText(
      'This application simulates a Pokédex, '
      + 'a digital encliclopedia containing all Pokémons',
    )).toBeInTheDocument();
    expect(screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    )).toBeInTheDocument();
  });

  test('page contains an image of a Pokédex', () => {
    renderWithRouter(<About />);
    expect(screen.getByAltText('Pokédex'))
      .toHaveAttribute('src',
        'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/'
        + '800px-Gen_I_Pok%C3%A9dex.png');
  });
});
