import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('test PokemonsDetails.js cards', () => {
  test('test if noma Details in on the screen', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const nameDetail = getByText(/pikachu details/i);
    expect(nameDetail).toBeInTheDocument();
  });

  test('test if Game locations exist', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const heading = getByText(/Game Locations of Pikachu/i);
    expect(heading).toBeInTheDocument();
  });

  test('name and map of localization', () => {
    const { getAllByAltText, getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const map1Localization = getByText(/Kanto Viridian Forest/i);
    const map2Localization = getByText(/Kanto Power Plant/i);
    const mapsImages = getAllByAltText(/pikachu location/i);
    expect(map1Localization && map2Localization).toBeInTheDocument();
    expect(mapsImages[0] && mapsImages[1]).toBeInTheDocument();
    expect(mapsImages[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapsImages[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
});
