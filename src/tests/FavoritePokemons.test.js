import React from 'react';
import { render } from '@testing-library/react';
import renderRouter from './renderRouter';
import FavoritePokemons from '../components/FavoritePokemons';

const arrMocadoTrue = [
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

const arrMocadoFalse = [];

describe('Requisito 3', () => {

  it('Verifica se a mensagem "no favorite pokemon found" é exibida.', () => {
    const { getByText } = render(<FavoritePokemons />);
    const noFound = getByText(/no favorite pokemon found/i);
    expect(noFound).toBeInTheDocument();
  });

  it('Verifica se é exibido todos os pokémons favoritos', () => {
    const { getByText } = renderRouter(
      <FavoritePokemons pokemons={ arrMocadoTrue } />,
    );
    const pokemonMocado = getByText('Pikachu');
    expect(pokemonMocado).toBeInTheDocument();
  });

  it('Verifica se pokémons não favoritados não são exibidos', () => {
    const { container } = renderRouter(
      <FavoritePokemons pokemons={ arrMocadoFalse } />,
    );
    const pokemonMocado = container.getElementsByClassName('favorite-pokemons');

    expect(pokemonMocado).not.toBe();
  });
});
