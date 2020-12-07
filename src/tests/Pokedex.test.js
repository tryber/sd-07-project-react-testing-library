import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

afterEach(cleanup);

describe('Requirement 5: Testing Pokedex.js', () => {
  test.skip('if the text "Encountered pokémons" exists in a h2 tag', () => {
    const fakeData = [
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
      {
        id: 151,
        name: 'Mew',
        type: 'Psychic',
        averageWeight: {
          value: '4.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn.bulbagarden.net/upload/4/43/Spr_5b_151.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Mew_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Faraway Island',
            map: 'https://cdn.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png',
          },
        ],
        summary: 'It is kinda creepy',
      },
    ];

    const fakeFavPokes = {
      143: true,
      10: false,
      151: false,
    };

    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ fakeData }
        isPokemonFavoriteById={ fakeFavPokes }
      />
    );
    const text = getByText(/encountered pokémons/i);
    expect(text).toBeInTheDocument();
    expect(text.tagName).toBe('H2');
  });

  describe('When the button "Próximo pokémon" is clicked, goes to the next', () => {
    test('if the text in the button is "Próximo pokémon"', () => {
      const fakeData = [
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
        {
          id: 151,
          name: 'Mew',
          type: 'Psychic',
          averageWeight: {
            value: '4.0',
            measurementUnit: 'kg',
          },
          image: 'https://cdn.bulbagarden.net/upload/4/43/Spr_5b_151.png',
          moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Mew_(Pok%C3%A9mon)',
          foundAt: [
            {
              location: 'Faraway Island',
              map: 'https://cdn.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png',
            },
          ],
          summary: 'It is kinda creepy',
        },
      ];
  
      const fakeFavPokes = {
        143: true,
        10: false,
        151: false,
      };
  
      const { getByText } = renderWithRouter(
        <Pokedex
          pokemons={ fakeData }
          isPokemonFavoriteById={ fakeFavPokes }
        />
      );

      const buttonText = getByText(/próximo pokémon/i);
      expect(buttonText).toBeInTheDocument();
    });

    test('if the next pokemon is shown', () => {
      const fakeData = [
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
        {
          id: 151,
          name: 'Mew',
          type: 'Psychic',
          averageWeight: {
            value: '4.0',
            measurementUnit: 'kg',
          },
          image: 'https://cdn.bulbagarden.net/upload/4/43/Spr_5b_151.png',
          moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Mew_(Pok%C3%A9mon)',
          foundAt: [
            {
              location: 'Faraway Island',
              map: 'https://cdn.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png',
            },
          ],
          summary: 'It is kinda creepy',
        },
      ];
  
      const fakeFavPokes = {
        143: true,
        10: false,
        151: false,
      };
  
      const { getByText, getByTestId } = renderWithRouter(
        <Pokedex
          pokemons={ fakeData }
          isPokemonFavoriteById={ fakeFavPokes }
        />
      );
      let index = 0;
      const pokemon = getByTestId('pokemon-name');
      const nextButton = getByText(/próximo pokémon/i);

      expect(pokemon).toHaveTextContent(fakeData[index].name);
      fireEvent.click(nextButton);
      index += 1;
      expect(pokemon).toHaveTextContent(fakeData[index].name);
    });

    test('if the first pokemon is shown after the last pokemon', () => {
      const fakeData = [
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
        {
          id: 151,
          name: 'Mew',
          type: 'Psychic',
          averageWeight: {
            value: '4.0',
            measurementUnit: 'kg',
          },
          image: 'https://cdn.bulbagarden.net/upload/4/43/Spr_5b_151.png',
          moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Mew_(Pok%C3%A9mon)',
          foundAt: [
            {
              location: 'Faraway Island',
              map: 'https://cdn.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png',
            },
          ],
          summary: 'It is kinda creepy',
        },
      ];
  
      const fakeFavPokes = {
        143: true,
        10: false,
        151: false,
      };

      const { getByText, getByTestId } = renderWithRouter(
        <Pokedex
          pokemons={ fakeData }
          isPokemonFavoriteById={ fakeFavPokes }
        />
      );
      const nextButton = getByText(/próximo pokémon/i);

      for (let index = 0; index < fakeData.length; index += 1) {
        if (index === fakeData.length - 1) {
          fireEvent.click(nextButton);
          const pokemon = getByTestId('pokemon-name');
          expect(pokemon.textContent).toBe(fakeData[0].name);
        } else {
          fireEvent.click(nextButton);
        }
      } 
    });
  });
});