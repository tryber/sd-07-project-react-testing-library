import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Testing PokemonDetails.js', () => {
  it('Tests if the selected Pokemons informations displays', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const btnMoreDetails = getByText(/More details/i);
    fireEvent.click(btnMoreDetails);
    expect(getByText(/Pikachu Details/i)).toBeInTheDocument();
    expect(btnMoreDetails).not.toBeInTheDocument();
    expect(getByRole('heading', { name: /Summary/i })).toBeInTheDocument();
    expect(getByText(/This intelligent Pokémon/i)).toBeInTheDocument();
  });

  it('Tests if a section with the Pokemons map exists', () => {
    const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
    const btnMoreDetails = getByText(/More details/i);
    fireEvent.click(btnMoreDetails);
    expect(getByRole('heading', { name: /Game Locations of Pikachu/i }))
      .toBeInTheDocument();
    expect(getByText(/Kanto Viridian Forest/i)).toBeInTheDocument();
    expect(getByText(/Kanto Power Plant/i)).toBeInTheDocument();
    const locations = getAllByAltText(/Pikachu location/i);
    expect(locations[0]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locations[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Tests if the user can add favorite Pokemon by the Pokemon card', () => {
    const { getByText, getByRole, getByAltText } = renderWithRouter(<App />);
    const btnMoreDetails = getByText(/More details/i);
    fireEvent.click(btnMoreDetails);
    const btnFavorite = getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(btnFavorite).toBeInTheDocument();
    fireEvent.click(btnFavorite);
    const starIcon = getByAltText('Pikachu is marked as favorite');
    expect(starIcon).toBeInTheDocument();
    fireEvent.click(btnFavorite);
    expect(starIcon).not.toBeInTheDocument();
  });
});
