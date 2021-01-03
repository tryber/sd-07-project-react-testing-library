import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

afterEach(cleanup);

describe('third requirement', () => {
  it(`should render the message 'No favorite pokemon found'
  if there's no favorited pokémons`, () => {
    render(<FavoritePokemons />);

    const text = screen.getByText(/No favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });

  it('should render all cards of the favorited pokémons', () => {
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

    const firstPokemon = screen.getByText('Snorlax');
    expect(firstPokemon).toBeInTheDocument();
    const secondPokemon = screen.getByText('Caterpie');
    expect(secondPokemon).toBeInTheDocument();
  });

  it('shouldnt render any card if theres no favorited pokémon', () => {
    render(<FavoritePokemons />);
    const pokemonOne = screen.queryByText(/pikachu/i);
    const pokemonTwo = screen.queryByText(/snorlax/i);
    expect(pokemonOne).not.toBeInTheDocument();
    expect(pokemonTwo).not.toBeInTheDocument();
  });
});
