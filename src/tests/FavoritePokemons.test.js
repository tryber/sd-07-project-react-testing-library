import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';

describe('3rd Req. | Testing FavoritePokemons.js', () => {
  it('should render a given message if theres no favorited pokémons', () => {
    const { getByText } = render(<FavoritePokemons />);
    const notFound = getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });
  it('should render all favorited pokémons', () => {
    const mokedPokemons = [
      {
        id: 143,
        name: 'Snorlax',
        type: 'Normal',
        averageWeight: {
          value: '460.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn.bulbagarden.net/upload/4/40/Spr_5b_143.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Snorlax_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Kanto Vermillion City',
            map: 'https://cdn.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png',
          },
        ],
        summary: 'It is hungry.',
      },
      {
        id: 10,
        name: 'Caterpie',
        type: 'Bug',
        averageWeight: {
          value: '2.9',
          measurementUnit: 'kg',
        },
        image: 'https://cdn.bulbagarden.net/upload/8/83/Spr_5b_010.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Johto Route 30',
            map: 'https://cdn.bulbagarden.net/upload/7/76/Johto_Route_30_Map.png',
          },
          {
            location: 'Johto Route 31',
            map: 'https://cdn.bulbagarden.net/upload/2/2b/Johto_Route_31_Map.png',
          },
          {
            location: 'Ilex Forest',
            map: 'https://cdn.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png',
          },
          {
            location: 'Johto National Park',
            map: 'https://cdn.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png',
          },
        ],
        summary: 'Well... It is a bug',
      },
    ];
    render(
      <MemoryRouter>
        <FavoritePokemons pokemons={ mokedPokemons } />
      </MemoryRouter>,
    );
    expect(screen.getByText(/snorlax/i)).toBeInTheDocument();
    expect(screen.getByText(/caterpie/i)).toBeInTheDocument();
  });

  it('shouldnt render a given pokémon if it isnt favorited', () => {
    render(<FavoritePokemons />);
    expect(screen.queryByText(/snorlax/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/caterpie/i)).not.toBeInTheDocument();
  });
});
