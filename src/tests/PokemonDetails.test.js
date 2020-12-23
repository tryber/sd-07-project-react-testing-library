import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

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
      map:
        'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary:
    'This intelligent Pokémon roasts hard berries',
};

describe('Testing PokemonDetails page', () => {
  test('detail info about selected pokemon', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const detailsPokemon = getByText(/Pikachu Details/i);
    expect(detailsPokemon).toBeInTheDocument();

    const heading = getByText(/Summary/i);
    expect(heading).toBeInTheDocument();

    const paragraph = getByText(/This intelligent Pokémon roasts hard/i);
    expect(paragraph).toBeInTheDocument();
  });

  test('contains a section with maps of the pokemon', () => {
    const { getByText, getAllByAltText, history } = renderWithRouter(<App />);
    const { name, foundAt } = pokemon;

    fireEvent.click(getByText(/More details/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const heading = getByText(/Game Locations of Pikachu/i);
    expect(heading).toBeInTheDocument();

    const imgLocations = getAllByAltText(`${name} location`);

    foundAt.forEach((location, index) => {
      expect(imgLocations[index].src).toBe(location.map);
    });

    // source: https://github.com/tryber/sd-07-project-react-testing-library/blob/AndreHorman-React-Testing-Library/src/tests/PokemonDetails.test.js
  });

  test('the user can check a pokemon as favorite', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const favoritePokemon = getByText(/Pokémon favoritado?/i);
    expect(favoritePokemon).toBeInTheDocument();
  });
});
