import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import App from '../App';
import pokemons from '../data';

describe('7. Testing the PokemonDetails.js file', () => {
  it('Detailed information about the selected Pokémon is shown on the screen.', () => {
    const favorites = { 0: true };
    const matchs = { params: { id: 25 } };
    const { getByText, queryByText } = renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
        match={ matchs }
      />,
    );
    const pokemonDetail = getByText(/Pikachu Details/i);
    expect(pokemonDetail).toBeInTheDocument();
    const detailsLink = queryByText(/More details/i);
    expect(detailsLink).not.toBeInTheDocument();
    const heading = getByText(/Summary/i);
    expect(heading.tagName).toBe('H2');
    const resume = getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(resume.tagName).toBe('P');
  });

  it(`There is a section on the page with maps
  containing the locations of the pokémon.`, () => {
    const favorites = { 0: true };
    const matchs = { params: { id: 25 } };
    const { getByText, queryAllByAltText, container } = renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
        match={ matchs }
      />,
    );
    const heading = getByText(/Game Locations of Pikachu/i);
    expect(heading.tagName).toBe('H2');
    const pokemonLocation = container.querySelector('div.pokemon-habitat');
    expect(pokemonLocation).toBeInTheDocument();
    const locationName = getByText(/Kanto Viridian Forest/i);
    expect(locationName).toBeInTheDocument();
    const locationImage = queryAllByAltText(/Pikachu location/i);
    expect(locationImage[0]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationImage[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('The user can bookmark a pokémon through the details page.', () => {
    const { container, getByText } = renderWithRouter(<App />);
    const pokemonDetail = getByText(/More Details/i);
    fireEvent.click(pokemonDetail);
    const favoriteCheckbox = container.querySelector('input');
    expect(favoriteCheckbox).toHaveAttribute('type', 'checkbox');
    fireEvent.click(favoriteCheckbox);
    const pokemonFavorited = container.querySelector('img.favorite-icon');
    expect(pokemonFavorited).toHaveAttribute('src', '/star-icon.svg');
    fireEvent.click(favoriteCheckbox);
    const pokemonFavorited2 = container.querySelector('img.favorite-icon');
    expect(pokemonFavorited2).not.toBeInTheDocument();
    const favoriteLabel = container.querySelector('label');
    expect(favoriteLabel.innerHTML).toContain('Pokémon favoritado?');
  });
});
