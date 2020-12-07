import React from 'react';
import { cleanup, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

afterEach(cleanup);

describe('Test FavoritePokemons page', () => {
  const pokemonObj = {
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
  };
  it('Test the rendered message for when there are no favorites', () => {
    const { getByText } = render(<FavoritePokemons />);

    const menssage = getByText('No favorite pokemon found');
    expect(menssage).toBeInTheDocument();
  });
  it('Test whether all favorite Pokémon cards are displayed.', () => {
    const { getByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ [pokemonObj] } />,
    );
    const name = getByTestId('pokemon-name');

    expect(name).toBeInTheDocument();
    expect(name.textContent).toBe('Pikachu');
  });
});
