import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('PokemonDetails.js', () => {
  it('deve mostrar informações detalhadas do pokemon', () => {
    renderWithRouter(<App />);

    let linkMoreDetails = screen.getByText('More details');
    fireEvent.click(linkMoreDetails);

    const pokemonDetailsTitle = screen.getByText(/pikachu details/i);
    linkMoreDetails = screen.queryAllByText(/more details/i);
    const pokemonSummary = screen.getByText(/summary/i);
    const paragraphAboutPokemon = screen.getByText(
      /this intelligent Pokémon roasts hard/i,
    );

    expect(pokemonDetailsTitle.textContent).toBe('Pikachu Details');
    expect(linkMoreDetails[0]).toBe(undefined);
    expect(pokemonSummary).toContainHTML('h2');
    expect(paragraphAboutPokemon).toBeInTheDocument();
  });

  it('deve conter uma seção com mapas de sua localização', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByText(/more details/i);
    fireEvent.click(linkMoreDetails);

    const pokemonName = screen.getByTestId(/pokemon-name/i);
    const heading = screen.getByText(/game Locations of pikachu/i);
    const kantoCity = screen.getByText(/kanto power plant/i);
    const veridinForest = screen.getByText(/kanto viridian forest/i);
    const locations = screen.getAllByAltText(/pikachu location/i);
    const locationsNumber = 2;

    expect(heading.textContent).toBe(`Game Locations of ${pokemonName.textContent}`);
    expect(heading).toContainHTML('h2');
    expect(kantoCity).toBeInTheDocument();
    expect(veridinForest.parentElement).toBeInTheDocument();
    expect(locations).toHaveLength(locationsNumber);
    expect(locations[0].alt).toBe('Pikachu location');
    expect(locations[1].alt).toBe('Pikachu location');
    expect(locations[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locations[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('usuário deve conseguir favoritar um pokémon', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByText(/more details/i);
    fireEvent.click(linkMoreDetails);

    const checkboxLabel = screen.getByText('Pokémon favoritado?');
    fireEvent.click(checkboxLabel);

    const favoriteIcon = screen.getByAltText(/pikachu is marked as favorite/i);
    const checkbox = screen.getByRole(/checkbox/i);

    expect(checkboxLabel.textContent).toBe('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();

    expect(favoriteIcon).toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
