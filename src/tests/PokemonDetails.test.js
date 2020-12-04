import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const mockedProps = {
  pokemons,
  isPokemonFavoriteById,
  onUpdateFavoritePokemons: () => { isPokemonFavoriteById[25] = true; },
  match: {
    path: '/pokemons/:id',
    url: '/pokemons/25',
    isExact: true,
    params: { id: '25' },
  },
};

describe('renders the Pokemon screen', () => {
  it('renders the pokemon info', () => {
    render(<PokemonDetails { ...mockedProps } />, { wrapper: MemoryRouter });

    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
    expect(screen.queryByText('More details')).not.toBeInTheDocument();
    expect(screen.getByText('Summary').tagName.toLowerCase()).toBe('h2');
    expect(screen.getByText(/This intelligent Pokémon roasts hard/i)).toBeInTheDocument();
    expect(screen.getByText('Game Locations of Pikachu').tagName).toBe('H2');

    const pokemonLocations = screen.getAllByAltText('Pikachu location');
    const pokemonLocationsLength = 2;
    expect(pokemonLocations.length).toBe(pokemonLocationsLength);

    expect(screen.getByText('Kanto Viridian Forest')).toBeInTheDocument();
    expect(pokemonLocations[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

    expect(screen.getByText('Kanto Power Plant')).toBeInTheDocument();
    expect(pokemonLocations[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('renders the favorite pokemon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const favoriteButton = screen.getByLabelText('Pokémon favoritado?');
    expect(screen.queryByAltText('Pikachu is marked as favorite'))
      .not.toBeInTheDocument();
    fireEvent.click(favoriteButton);
    expect(screen.queryByAltText('Pikachu is marked as favorite')).toBeInTheDocument();
  });
});
