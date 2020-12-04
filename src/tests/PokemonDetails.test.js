import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('test Pokemon Details component', () => {
  it('render select pokemon details', () => {
    const { getByText } = renderWithRouter(<App />);
    const detailsBtn = getByText(/More details/i);
    fireEvent.click(detailsBtn);
    const nameDetails = getByText(/Pikachu Details/i);
    expect(nameDetails).toBeInTheDocument();
    const paragraph = getByText(/electricity to make them/i);
    expect(paragraph).toBeInTheDocument();
    const summary = getByText(/Summary/i);
    expect(summary).toBeInTheDocument();
  });

  it('render pokemon locations', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);
    const detailsBtn = getByText(/More details/i);
    fireEvent.click(detailsBtn);
    const locations = getByText(/Game Locations of Pikachu/i);
    expect(locations).toBeInTheDocument();
    const firstLocation = getByText(/Kanto Viridian Forest/i);
    const secondLocation = getByText(/Kanto Power Plant/i);
    expect(firstLocation).toBeInTheDocument();
    expect(secondLocation).toBeInTheDocument();
    const images = getAllByAltText(/Pikachu location/i);
    expect(images[0]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('possible to favorite the pokemon in details', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const detailsBtn = getByText(/More details/i);
    fireEvent.click(detailsBtn);
    const favoriteLabel = getByText(/Pokémon favoritado?/i);
    expect(favoriteLabel).toBeInTheDocument();
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeTruthy();
  });
});
