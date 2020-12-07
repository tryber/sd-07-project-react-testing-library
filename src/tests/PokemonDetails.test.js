import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('if the pokémon details is shown in the screen', () => {
  it('should render the pokémon name', () => {
    const { getByText } = renderWithRouter(<App />);
    const pokemonDetails = getByText(/More details/i);

    fireEvent.click(pokemonDetails);

    const pokemonName = getByText(/Pikachu Details/i);
    expect(pokemonName).toBeInTheDocument();
  });

  it('should not render a link to pokémon details', () => {
    const { getByText, queryByText } = renderWithRouter(<App />);
    const pokemonDetails = getByText(/More details/i);

    fireEvent.click(pokemonDetails);

    const selectedPokemonDetails = queryByText(/More details/i);
    expect(selectedPokemonDetails).not.toBeInTheDocument();
  });

  it('should have a `summary` with the h2 tag', () => {
    const { getByText } = renderWithRouter(<App />);
    const pokemonDetails = getByText(/More details/i);

    fireEvent.click(pokemonDetails);

    const summary = getByText(/Summary/i);
    expect(summary.tagName).toBe('H2');
  });

  it('should have a paragraph with the pokémon resume', () => {
    const { getByText } = renderWithRouter(<App />);
    const pokemonDetails = getByText(/More details/i);

    fireEvent.click(pokemonDetails);

    const resume = getByText(/This intelligent Pokémon/i);
    expect(resume).toBeInTheDocument();
    expect(resume.tagName).toBe('P');
  });
});

describe('it should have a map containing the pokémon location', () => {
  it('should have one h2 with the text `Game Locations of pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const pokemonDetails = getByText(/More details/i);

    fireEvent.click(pokemonDetails);

    const map = getByText(/Game Locations of Pikachu/i);
    expect(map).toBeInTheDocument();
    expect(map.tagName).toBe('H2');
  });

  it('should shown all locations in details', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);
    const pokemonDetails = getByText(/More details/i);

    fireEvent.click(pokemonDetails);

    const locations = getAllByAltText(/Pikachu location/i);
    expect(locations[0]).toBeInTheDocument();
    expect(locations[1]).toBeInTheDocument();
    const locationsLength = 2;
    expect(locations).toHaveLength(locationsLength);
  });

  it('should shown all locations in details', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);
    const pokemonDetails = getByText(/More details/i);

    fireEvent.click(pokemonDetails);

    const locations = getAllByAltText(/Pikachu location/i);
    expect(locations[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locations[0].nextSibling.innerHTML).toBe('<em>Kanto Viridian Forest</em>');
    expect(locations[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(locations[1].nextSibling.innerHTML).toBe('<em>Kanto Power Plant</em>');
  });
});

describe('if the user can favor a pokémon in the details section', () => {
  it('should have a checkbox', () => {
    const { getByText } = renderWithRouter(<App />);
    const pokemonDetails = getByText(/More details/i);

    fireEvent.click(pokemonDetails);

    const isFavorite = getByText(/Pokémon favoritado/i);
    const input = isFavorite.firstChild.nextSibling;
    expect(input.type).toBe('checkbox');
  });

  it('should add or remove the pokémon from the favorites when clicked', () => {
    const { getByText, queryByAltText } = renderWithRouter(<App />);
    const pokemonDetails = getByText(/More details/i);

    fireEvent.click(pokemonDetails);

    const isFavorite = getByText(/Pokémon favoritado/i);
    const favoriteInput = isFavorite.firstChild.nextSibling;
    fireEvent.click(favoriteInput);

    const markedAsFavorite = queryByAltText(/Pikachu is marked as favorite/i);
    expect(markedAsFavorite.src).toBe('http://localhost/star-icon.svg');
    expect(markedAsFavorite).toBeInTheDocument();

    fireEvent.click(favoriteInput);
    expect(markedAsFavorite).not.toBeInTheDocument();
  });
});
