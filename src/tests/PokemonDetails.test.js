import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

afterEach(cleanup);
describe('Testando o arquivo `PokemonDetails.js`', () => {
  it('Verifica se exibe as informações detalhadas do pokémon', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const details = getByText('More details');
    expect(details).toBeInTheDocument();
    fireEvent.click(details);
    const text = getByText('Pikachu Details');
    expect(text).toBeInTheDocument();
    expect(details).not.toBeInTheDocument();
    const title = getByRole('heading', { name: 'Summary' });
    expect(title.innerHTML).toBe('Summary');
    const resume = getByText(/This intelligent Pokémon roasts hard berries/);
    expect(resume).toBeInTheDocument();
  });

  it('Verifica se exibe os mapas de localização do pokémon', () => {
    const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
    const details = getByText('More details');
    fireEvent.click(details);
    const title = getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(title.innerHTML).toBe('Game Locations of Pikachu');
    const maps = getAllByAltText('Pikachu location');
    expect(maps[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[0].alt).toBe('Pikachu location');
    expect(maps[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(maps[1].alt).toBe('Pikachu location');
    const locationName1 = getByText('Kanto Viridian Forest');
    expect(locationName1).toBeInTheDocument();
    const locationName2 = getByText('Kanto Power Plant');
    expect(locationName2).toBeInTheDocument();
  });

  it('Verifica se o usuário pode favoritar um pokémon', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    const details = getByText('More details');
    fireEvent.click(details);
    const favorite = getByLabelText('Pokémon favoritado?');
    expect(favorite).toBeInTheDocument();
    fireEvent.click(favorite);
    expect(favorite.checked).toBeTruthy();
    fireEvent.click(favorite);
    expect(favorite.checked).not.toBeTruthy();
  });
});
