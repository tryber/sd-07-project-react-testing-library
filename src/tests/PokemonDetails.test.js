import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';

describe('Testando o arquivo Pokemon.js', () => {
  test('É renderizado um card com as informações de determinado pokémon.', () => {
    const { getByText, getByRole } = RenderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    expect(getByText('Pikachu Details')).toBeInTheDocument();
    const heading = getByRole('heading', { name: /summary/i });
    expect(heading.innerHTML).toBe('Summary');
    const summary = getByText(/This intelligent Pokémon roasts/i);
    expect(summary).toBeInTheDocument();
  });
  test('Contém as localizações do pokémon.', () => {
    const { getByText, getAllByAltText } = RenderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    expect(getByText('Game Locations of Pikachu')).toBeInTheDocument();
    const location = getAllByAltText('Pikachu location');
    const numOfLocations = 2;
    expect(location.length).toBe(numOfLocations);
    expect(location[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(location[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  test('o usuário pode favoritar um pokémon', () => {
    const { getByText, getByRole } = RenderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    expect(getByText(/pokémon favoritado?/i)).toBeInTheDocument();

    fireEvent.click(getByText(/pokémon favoritado?/i));
    const favoritePokemon = getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favoritePokemon.src).toBe('http://localhost/star-icon.svg');
    expect(favoritePokemon).toBeInTheDocument();
  });
});
