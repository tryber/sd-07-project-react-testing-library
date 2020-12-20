import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('favorite pokemon works correctly', () => {
  test('page renderer correctly if not have favorited pokemons', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const text = getByText(/No favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });
  test('page renderer correctly if have favorited pokemons', () => {
    const simulator = [{
      id: 23,
      name: 'Ekans',
      type: 'Poison',
      averageWeight: {
        value: '6.9',
        measurementUnit: 'kg',
      },
      image: 'https://cdn.bulbagarden.net/upload/1/18/Spr_5b_023.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Goldenrod Game Corner',
          map: 'https://cdn.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png',
        },
      ],
      summary: 'It can become too heavy to move, however.',
    },
    {
      id: 65,
      name: 'Alakazam',
      type: 'Psychic',
      averageWeight: {
        value: '48.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)',
      foundAt: [
        {
          location: 'Unova Accumula Town',
          map: 'https://cdn.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png',
        },
      ],
      summary: 'Closing both its eyes heightens all its other senses.',
    }];
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ simulator } />);
    const ekans = getByText(/Ekans/i);
    const alakazam = getByText(/Alakazam/i);
    expect(ekans).toBeInTheDocument();
    expect(alakazam).toBeInTheDocument();
  });
});
