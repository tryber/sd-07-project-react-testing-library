import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('links', () => {
  it('test About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/about');
    const about = getByText('About Pokédex');
    expect(about).toBeInTheDocument();
  });

  it('test paragrafo 1', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/about');
    const about = getByText(/This application simulates a Pokédex, a digital/i);
    expect(about).toBeInTheDocument();
  });

  it('test paragrafo 2', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/about');
    const about = getByText(/One can filter Pokémons by type, and see more details/i);
    expect(about).toBeInTheDocument();
  });

  it('test img', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    const srcimagem = 'https://cdn.bulbagarden.net/upload/thumb/8/86/'
    + 'Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    history.push('/about');
    const img = getByAltText('Pokédex');
    expect(img.src).toEqual(srcimagem);
  });
});
