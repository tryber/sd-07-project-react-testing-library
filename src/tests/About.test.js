import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('2. Testing the About.js file', () => {
  it('The page contains information about Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const heading = getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('The page contains an h2 heading with the text About Pokédex.', () => {
    const { container } = renderWithRouter(<About />);
    const heading = container.querySelector('h2');
    expect(heading).toBeInTheDocument();
    expect(heading.innerHTML).toBe('About Pokédex');
  });

  it('The page contains two paragraphs with text about Pokédex.', () => {
    const { container } = renderWithRouter(<About />);
    const paragraphs = container.querySelectorAll('p');
    const paragraphsLength = 2;
    expect(paragraphs.length).toBe(paragraphsLength);
  });

  it('The page contains the image of a Pokédex.', () => {
    const { container } = renderWithRouter(<About />);
    const image = container.querySelector('img');
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
