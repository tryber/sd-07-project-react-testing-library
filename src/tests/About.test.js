import React from 'react';
import { cleanup } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../helpers/renderWithRouter';

afterEach(cleanup);

describe('Testing the About.js file', () => {
  it('Tests whether the page contains the following image of a Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');

    expect(image).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
  it('Test if the page contains two paragraphs with text about Pokédex.', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const text = getAllByText(/Pokémons/i);
    expect(text.length.toString()).toBe('2');
  });
  it('The page contains information about Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const text = getByText('About Pokédex');
    expect(text).toBeInTheDocument();
  });
});
