import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('test PokemonsDetails.js cards', () => {
  test('test if noma Details in on the screen', () => {
    renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/More details/i));
    const nameDetail = screen.getByText(/pikachu details/i);
    expect(nameDetail).toBeInTheDocument();

    const linkDetails = screen.queryByRole(/More details/i);
    expect(linkDetails).not.toBeInTheDocument();

  const heading = screen.getByText(/Summary/i);
  expect(heading).toBeInTheDocument();

  expect(screen.getByText(/This intelligent Pokémon roasts hard/i))
    .toBeInTheDocument();
  });

  test('test if Game locations exist', () => {
    renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/More details/i));
    const heading = screen.getByText(/Game Locations of Pikachu/i);
    expect(heading).toBeInTheDocument();
  });

  test('name and map of localization', () => {
    renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/More details/i));
    const map1Localization = screen.getByText(/Kanto Viridian Forest/i);
    const map2Localization = screen.getByText(/Kanto Power Plant/i);
    const mapsImages = screen.getAllByAltText(/pikachu location/i);
    expect(map1Localization && map2Localization).toBeInTheDocument();
    expect(mapsImages[0] && mapsImages[1]).toBeInTheDocument();
    expect(mapsImages[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapsImages[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Test if you con favorite by Detaisl page', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(details);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeTruthy();
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeFalsy();
    const favorite = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favorite).toBeInTheDocument();
  });
});
