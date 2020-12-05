import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testando o arquivo About.js', () => {
  it('checks if a page contains information about a Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const information = getByText(/This application simulates a Pokédex/i);
    expect(information).toBeInTheDocument();
  });

  it('check if the page contains an h2 heading with the text About Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const heading = getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  it('check if the page contains two paragraphs with text about Pokédex.', () => {
    const { container } = renderWithRouter(<About />);
    const paragraphs = container.querySelectorAll('p');
    const paragraphsLength = 2;
    expect(paragraphs.length).toBe(paragraphsLength);
  });

  it('Test if the page contains an image of a Pokédex', () => {
    const imageURL = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const { container } = renderWithRouter(<About />);
    const imageTag = container.querySelector('img').src;
    expect(imageURL).toBe(imageTag);
  });
});
