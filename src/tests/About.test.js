import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Testing About.js', () => {
  it('Tests if the page contains Pokedex info', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('About'));
    const pokedexInfo = getByText(/About Pokédex/i);
    expect(pokedexInfo).toBeInTheDocument();
  });
  it('Testing if the page have a About Pokedex in a H2', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('About'));
    const pokedexH2 = getByText(/About Pokédex/i);
    expect(pokedexH2).toBeInTheDocument();
  });
  it('Testing if the page contains two paragraphs about Pokedex', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('About'));
    const pokedexP1 = getByText(/This application simulates a Pokédex/);
    expect(pokedexP1).toBeInTheDocument();
    const pokedexP2 = getByText(/One can filter Pokémons by type/);
    expect(pokedexP2).toBeInTheDocument();
  });
  it('Testing if the page contains a Pokedex image', () => {
    const { getByAltText, getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('About'));
    const imageAlt = getByAltText('Pokédex');
    expect(imageAlt.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
