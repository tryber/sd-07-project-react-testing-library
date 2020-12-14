import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import PokemonDetails from '../components/PokemonDetails';
import RenderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testing the PokemonDetails file', () => {
  const poke = pokemons[0];
  const {
    id,
    name,
    summary,
    foundAt,
  } = poke;
  const match = { params: { id: poke.id.toString() } };
  it('if detailed information of the selected Pokémon is shown', () => {
    const { container, queryByText } = RenderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById(id) }
        onUpdateFavoritePokemons={ () => {} }
        match={ match }
        pokemons={ pokemons }
      />,
    );
    const pikachu = queryByText('Pikachu Details');
    expect(pikachu).toBeInTheDocument();
    const linkDetails = screen.queryByRole('link', { href: '/pokemons/25' });
    expect(linkDetails).toBeNull();
    const details = queryByText('Summary');
    expect(details).toBeInTheDocument();
    const paragraph = container.querySelectorAll('p');
    expect(paragraph[3].innerHTML).toBe(summary);
  });
  it('If there is a section with maps with the locations of the pokémon', () => {
    const { queryByText } = RenderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById(id) }
        onUpdateFavoritePokemons={ () => {} }
        match={ match }
        pokemons={ pokemons }
      />,
    );
    const heading = queryByText(`Game Locations of ${name}`);
    expect(heading).toBeInTheDocument();
    const map1 = foundAt[0].map;
    expect(map1).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    const location1 = foundAt[0].location;
    expect(location1).toBe('Kanto Viridian Forest');
    const map2 = foundAt[1].map;
    expect(map2).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    const location2 = foundAt[1].location;
    expect(location2).toBe('Kanto Power Plant');
  });
  it('If the user can favor a pokémon through the details page', () => {
    const { getByLabelText } = RenderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById(id) }
        onUpdateFavoritePokemons={ () => {} }
        match={ match }
        pokemons={ pokemons }
      />,
    );

    const checkbox = getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
    fireEvent.change(checkbox, { target: { checked: false } });
    expect(checkbox.checked).toBeFalsy();
    fireEvent.change(checkbox, { target: { checked: true } });
    expect(checkbox.checked).toBeTruthy();
  });
});
