import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('About.js', () => {
  it('deve renderizar informações sobre a Pokédex', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    const buttonAbout = getByText(/about/i);
    fireEvent.click(buttonAbout);

    const imgAtribute = getByAltText(/pokédex/i);
    const pokedexTitle = getByText(/about pokédex/i);
    const paragraphOne = getByText(/(pokémons by)/i);
    const paragraphTwo = getByText(/(pokédex, a)/i);

    expect(imgAtribute.alt).toBe('Pokédex');
    expect(pokedexTitle.textContent).toBe('About Pokédex');
    expect(paragraphOne.textContent).toMatch('One can filter Pokémons');
    expect(paragraphTwo.textContent).toMatch('This application simulates');
    expect(imgAtribute.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
