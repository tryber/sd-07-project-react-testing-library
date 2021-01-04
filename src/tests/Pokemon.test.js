import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { Pokemon } from '../components';

describe('pokemon card renderer correctly', () => {
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
    summary: 'This intelligent Pokémon roasts',
  };
  test('test if card renderer correctly', () => {
    const { getByAltText, getByTestId } = renderWithRouter(<App />);
    const name = getByTestId('pokemon-name');
    const type = getByTestId('pokemonType');
    const peso = getByTestId('pokemon-weight');
    const image = getByAltText(`${pokemon.name} sprite`);
    const averageWeight = pokemon.averageWeight.value;
    const unit = pokemon.averageWeight.measurementUnit;
    expect(name.textContent).toBe(pokemon.name);
    expect(name).toBeInTheDocument();
    expect(type.textContent).toBe(pokemon.type);
    expect(type).toBeInTheDocument();
    expect(peso.textContent)
      .toBe(
        `Average weight: ${averageWeight} ${unit}`,
      );
    expect(weight).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(pokemon.image);
  });
  test('test if link works correctly', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const link = getByText(/More Details/i);
    expect(link).toBeInTheDocument();
    expect(link.href).toContain(`/pokemons/${pokemon.id}`);
    fireEvent.click(link);
    const { pathname } = history.location;
    const pageName = getByText(`${pokemon.name} Details`);
    expect(pageName).toBeInTheDocument();
    expect(pathname).toBe(`/pokemons/${pokemon.id}`);
  });
  test('test if favorite pokemon works correctly', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite />,
    );
    const icon = getByAltText(`${pokemon.name} is marked as favorite`);
    expect(icon).toBeInTheDocument();
    expect(icon.src).toContain('/star-icon.svg');
  });
});