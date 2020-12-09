import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import PokemonDetails from '../components/PokemonDetails';
import App from '../App';

describe('Requirement 07', () => {
  test('1/3', () => {
    renderWithRouter(
      <PokemonDetails
        match={ { params: { id: 143 } } }
        isPokemonFavoriteById={ false }
        pokemons={ pokemons }
      />
    );

    const titleSnorlaxDetails = screen.getByText(/snorlax details/i);
    const moreDetailsLink = screen.queryByText('More Details');
    const titleSummary = screen.getByText(/summary/i);
    const snorlaxDetails = screen.getByText(/What sounds like its cry/i);

    expect(titleSnorlaxDetails).toBeInTheDocument();
    expect(moreDetailsLink).not.toBeInTheDocument();
    expect(titleSummary.tagName).toBe('H2');
    expect(titleSummary).toBeInTheDocument();
    expect(snorlaxDetails.tagName).toBe('P');
    expect(snorlaxDetails).toBeInTheDocument();
  });

  test('2/3', () => {
    renderWithRouter(<PokemonDetails match={ { params: { id: 143 } } } isPokemonFavoriteById={ false } pokemons={ pokemons } />);

    const snorlaxGameLocation = screen.getByText(/game locations of snorlax/i);
    const locationInText = screen.getByText(/kanto/i);
    const imageLocation = screen.getByAltText(/snorlax location/i);

    expect(snorlaxGameLocation).toBeInTheDocument();
    expect(snorlaxGameLocation.tagName).toBe('H2');
    expect(locationInText).toBeInTheDocument();
    expect(imageLocation).toBeInTheDocument();
    expect(imageLocation.src).toBe('https://cdn.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png');
  });

  test('3/3', () => {
    renderWithRouter(<App pokemons={ pokemons } />);

    const normalTypeButton = screen.getByText(/normal/i);
    fireEvent.click(normalTypeButton);

    const moreDetailsLink = screen.getByText(/more details/i);
    fireEvent.click(moreDetailsLink);

    const labelOfFavoriteInput = screen.getByLabelText(/favorite/i);
    expect(labelOfFavoriteInput).toBeInTheDocument();
    
    fireEvent.click(labelOfFavoriteInput);
    const favoriteIcon = screen.getByAltText(/snorlax is marked as favorite/i);
    expect(favoriteIcon).toBeInTheDocument();
    
    fireEvent.click(labelOfFavoriteInput);
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
