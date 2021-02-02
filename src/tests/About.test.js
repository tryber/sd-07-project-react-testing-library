import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('About.js', () => {
  it('deve renderizar informações sobre a Pokédex', () => {
    const { getByText, getByAltText, getAllByText } = renderWithRouter(<App />);
    const buttonAbout = getByText(/about/i);
    fireEvent.click(buttonAbout);

    const imgAtribute = getByAltText(/pokédex/i);
    const pokedexTitle = getByText(/about pokédex/i);
    const aboutPokedexparagraphs = getAllByText(/(pokédex, a|pokémons by)/i);

    expect(imgAtribute.alt).toBe('Pokédex');
    expect(pokedexTitle.textContent).toBe('About Pokédex');
    expect(aboutPokedexparagraphs.length).toBe(2);
    expect(imgAtribute.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
