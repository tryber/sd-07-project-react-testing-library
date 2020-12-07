import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

afterEach(cleanup);

describe('Requirement 3: Testing FavoritePokemons.js', () => {
  test('if the page contains the text "No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const expectedText = getByText(/no favorite pokemon found/i);
    expect(expectedText).toBeInTheDocument();
  });

  test('if the page shows all the favorite pokemon', () => {
    const fakeFavs = [
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
        summary: 'What sounds like its cry may actually be its snores or the rumblings of its hungry belly.',
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
        summary: 'For protection, it releases a horrible stench from the antennae on its head to drive away enemies.',
      }
    ];
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ fakeFavs } />);
    const snorlax = getByText(/snorlax/i);
    const caterpie = getByText(/caterpie/i);
    expect(snorlax).toBeInTheDocument();
    expect(caterpie).toBeInTheDocument();
  });

  test('if the page does not show non-favorite pokemon', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons />);
    const snorlax = queryByText(/snorlax/i);
    expect(snorlax).not.toBeInTheDocument();
  });
});