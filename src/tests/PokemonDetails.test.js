import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { fireEvent, screen } from '@testing-library/react';

describe('pokemon details works correctly', () => {
  const pokemon = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  }

  test('page renderer correctly details about pokemons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemon.id}`);
    const details = getByText(`${pokemon.name} Details`);
    const btn = screen.queryByText(/More Details/i);
    const summaryTitle = getByText(/Summary/i);
    const summary = getByText(pokemon.summary);
    expect(details).toBeInTheDocument();
    expect(btn).not.toBeInTheDocument();
    expect(summaryTitle).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
  });
  test('page renderer correctly the maps of pokemons', () => {
    const { getByText, getAllByAltText, history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemon.id}`);
    const heading = getByText(`Game Locations of ${pokemon.name}`);
    expect(heading).toBeInTheDocument();
    pokemon.foundAt.map((location) => {
      const name = getByText(location.location);
      expect(name).toBeInTheDocument();
      return true;
    });
    const images = getAllByAltText(`${pokemon.name} location`);
    images.map((img, index) => {
      expect(img).toBeInTheDocument();
      expect(img.src).toBe(pokemon.foundAt[index].map);
      return true;
    });
  });
  test('checkbox works correctly', () => {
    const { getByLabelText,
      getByAltText,
      history,
       } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemon.id}`);
    const checkbox = getByLabelText(/Pokémon favoritado?/i);
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);
    const iconFav = getByAltText(`${pokemon.name} is marked as favorite`);
    expect(iconFav).toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(iconFav).not.toBeInTheDocument();
  });
});
