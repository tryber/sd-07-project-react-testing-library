import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

const mockValueTrue = [
  {
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
      'This intelligent Pokémon ... to eat.',
  },
];

const mockValueFalse = [];

describe('Testa FavoritePokemons.js', () => {
  it('testa se a pessoa NÃO tem pokémons favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const msg = getByText('No favorite pokemon found');

    expect(msg).toBeInTheDocument();
  });
  it('testa se é exibido todos os pokémons favoritos', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ mockValueTrue } />,
    );
    const mockPokemon = getByText('Pikachu');

    expect(mockPokemon).toBeInTheDocument();
  });
  it('testa se pokémons que não são favoritos não são exibidos', () => {
    const { container } = renderWithRouter(
      <FavoritePokemons pokemons={ mockValueFalse } />,
    );
    const mockPokemon = container.getElementsByClassName('favorite-pokemons');

    expect(mockPokemon).not.toBe();
  });
});
