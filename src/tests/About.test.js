import React from 'react';
import { About } from '../components';
import renderWhitRouter from '../RenderWhitRouter';

describe('Test whether a page contains information about a Pokédex', () => {
  it('Test wheter page contain h2 whit text About Pokedex.', () => {
    const { getByText } = renderWhitRouter(<About />);
    const header = getByText(/About Pokédex/i);
    expect(header).toBeInTheDocument();
  });

  it('Test whether the page contains two paragraphs with text on a Pokédex.', () => {
    const { getByText } = renderWhitRouter(<About />);
    const textOne = getByText(/This application simulates a Pokédex/i);
    expect(textOne).toBeInTheDocument();

    const textTwo = getByText(/One can filter Pokémons by type/i);
    expect(textTwo).toBeInTheDocument();
  });

  it('Test if the page contains an image of a pokedex', () => {
    const { getByAltText } = renderWhitRouter(<About />);
    const picture = getByAltText('Pokédex');
    expect(picture.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
