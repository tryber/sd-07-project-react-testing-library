import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testing the About.js file', () => {
  it('Test if the page contains information about Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const informations = getByText(/This application simulates a Pokédex/);
    expect(informations).toBeInTheDocument();
  });
  it('Test if the page contains a heading `h2` with the text` About Pokédex`', () => {
    // eslint-disable-next-line no-unused-vars
    const { getByRole } = renderWithRouter(<About />);
    const about = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(about).toBeInTheDocument();
  });
  it('If the page contains the following image of a Pokédex:', () => {
    const { getByRole } = renderWithRouter(<About />);
    const src = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = getByRole('img', { src });
    expect(image.src).toBe(src);
  });
});
