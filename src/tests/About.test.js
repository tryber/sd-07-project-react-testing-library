import React from 'react';
import About from '../components/About';
import renderWithRouter from '../services/renderWithRouter';

describe('testing About.js', () => {
  test('testing if the page has all infos about Pokedex', () => {
    const { getByText } = renderWithRouter(<About />);

    const infosPokedex = getByText(/One can filter Pokémons by type, and see more/i);
    expect(infosPokedex).toBeInTheDocument();
  });

  test('testing if About.js has a tag h2 with About Pokédex', () => {
    const { container } = renderWithRouter(<About />);

    const tag = container.querySelector('h2').innerHTML;
    expect(tag).toBe('About Pokédex');
  });

  test('verify if there is two paragraphs', () => {
    const { container } = renderWithRouter(<About />);

    const paragraph = container.querySelectorAll('p');
    expect(paragraph.length.toString()).toBe('2');
  });

  test('test if /About has an especific image', () => {
    const { getByAltText } = renderWithRouter(<About />);

    const imageOfPokedex = getByAltText(/Pokédex/i);
    expect(imageOfPokedex.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
