import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';

afterEach(cleanup);

describe('Requirement 5: Testing Pokedex.js', () => {
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
      summary: 'A pretty smart one.',
    },
  ];

  const fakeFavPokes = {
    143: true,
    10: false,
    151: false,
    65: true,
  };

  test('if the text "Encountered pokémons" exists in a h2 tag', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ fakeData }
        isPokemonFavoriteById={ fakeFavPokes }
      />,
    );
    const text = getByText(/encountered pokémons/i);
    expect(text).toBeInTheDocument();
    expect(text.tagName).toBe('H2');
  });

  describe('When the button "Próximo pokémon" is clicked, goes to the next', () => {
    test('if the text in the button is "Próximo pokémon"', () => {
      const { getByText } = renderWithRouter(
        <Pokedex
          pokemons={ fakeData }
          isPokemonFavoriteById={ fakeFavPokes }
        />,
      );

      const buttonText = getByText(/próximo pokémon/i);
      expect(buttonText).toBeInTheDocument();
    });

    test('if the next pokemon is shown', () => {
      const { getByText, getByTestId } = renderWithRouter(
        <Pokedex
          pokemons={ fakeData }
          isPokemonFavoriteById={ fakeFavPokes }
        />,
      );
      const index = 0;
      const pokemon = getByTestId('pokemon-name');
      const nextButton = getByText(/próximo pokémon/i);

      expect(pokemon).toHaveTextContent(fakeData[index].name);
      fireEvent.click(nextButton);
      expect(pokemon).toHaveTextContent(fakeData[index + 1].name);
    });

    test('if the first pokemon is shown after the last pokemon', () => {
      const { getByText, getByTestId } = renderWithRouter(
        <Pokedex
          pokemons={ fakeData }
          isPokemonFavoriteById={ fakeFavPokes }
        />,
      );
      const nextButton = getByText(/próximo pokémon/i);

      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      const firstPoke = getByTestId('pokemon-name');
      expect(firstPoke).toHaveTextContent(/snorlax/i);
    });
  });

  test('if only one pokemon is shown', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ fakeData }
        isPokemonFavoriteById={ fakeFavPokes }
      />,
    );

    const pokemon = getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  describe('if the Pokedex has filter buttons', () => {
    test('if all the pokemon have the same type after clicking', () => {
      const { queryAllByTestId, getByRole } = renderWithRouter(
        <Pokedex
          pokemons={ fakeData }
          isPokemonFavoriteById={ fakeFavPokes }
        />,
      );

      const fakeType = 'Psychic';
      const psychicButton = getByRole('button', { name: /psychic/i });
      fireEvent.click(psychicButton);
      const allPsychicPoke = queryAllByTestId('pokemonType');

      allPsychicPoke.forEach((poke) => {
        expect(poke).toHaveTextContent(fakeType);
      });
    });

    test('if the text in the button matches the type\'s name ', () => {
      const { queryAllByTestId, getByRole } = renderWithRouter(
        <Pokedex
          pokemons={ fakeData }
          isPokemonFavoriteById={ fakeFavPokes }
        />,
      );
      const psychicButton = getByRole('button', { name: /psychic/i });
      fireEvent.click(psychicButton);
      const pokes = queryAllByTestId('pokemonType');
      const type = pokes.find((poke) => poke.textContent === psychicButton.textContent);
      expect(type).toBeTruthy();
    });
  });

  describe('if it has a reset button', () => {
    test('if the text in the button is "all"', () => {
      const { getAllByRole } = renderWithRouter(
        <Pokedex
          pokemons={ fakeData }
          isPokemonFavoriteById={ fakeFavPokes }
        />,
      );

      const buttons = getAllByRole('button');
      const allButton = buttons.find((button) => button.textContent === 'All');
      expect(allButton).toBeTruthy();
    });

    test('if it clears all filters after clicking', () => {
      const { getByRole, queryAllByTestId } = renderWithRouter(
        <Pokedex
          pokemons={ fakeData }
          isPokemonFavoriteById={ fakeFavPokes }
        />,
      );

      const psychicButton = getByRole('button', { name: /psychic/i });
      fireEvent.click(psychicButton);
      const allButton = getByRole('button', { name: 'All' });
      fireEvent.click(allButton);
      const pokes = queryAllByTestId('pokemon-name');
      expect(pokes[0]).not.toHaveTextContent(/mew/i);
      expect(pokes[0]).toHaveTextContent(/snorlax/i);
    });

    test('if the "all" button is selected when the page is loaded', async () => {
      const { getByText } = await renderWithRouter(
        <Pokedex
          pokemons={ fakeData }
          isPokemonFavoriteById={ fakeFavPokes }
        />,
      );

      const firstPoke = getByText(/snorlax/i);
      expect(firstPoke).toBeInTheDocument();
    });
  });

  describe('if the buttons are created dynamically after each type', () => {
    const mockedData = [
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
            map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
          },
        ],
        summary: 'Don\'t touch it if it is in a bad mood',
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
        id: 4,
        name: 'Charmander',
        type: 'Fire',
        averageWeight: {
          value: '8.5',
          measurementUnit: 'kg',
        },
        image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
        moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Alola Route 3',
            map: 'https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
          },
          {
            location: 'Kanto Route 3',
            map: 'https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
          },
          {
            location: 'Kanto Route 4',
            map: 'https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
          },
          {
            location: 'Kanto Rock Tunnel',
            map: 'https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
          },
        ],
        summary: 'Fire all over the place.',
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
        summary: 'A pretty smart one.',
      },
    ];

    const mockedFavs = {
      25: true,
      10: false,
      4: false,
      65: true,
    };

    test('if they are dynamic and the "all" button is visible', () => {
      const { getAllByTestId, getByRole } = renderWithRouter(
        <Pokedex
          pokemons={ mockedData }
          isPokemonFavoriteById={ mockedFavs }
        />,
      );
      const allButton = getByRole('button', { name: /all/i });
      const typeButtons = getAllByTestId('pokemon-type-button');
      typeButtons.forEach((type) => {
        const poke = mockedData.find((each) => (each.type === type.textContent));
        expect(poke).toBeTruthy();
        expect(allButton).toBeInTheDocument();
      });
    });
  });

  test('if "Próximo pokémon" is disabled when there is only one pokemon', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ fakeData }
        isPokemonFavoriteById={ fakeFavPokes }
      />,
    );
    const normalButton = getByRole('button', { name: /normal/i });
    const nextButton = getByRole('button', { name: /próximo pokémon/i });
    fireEvent.click(normalButton);
    expect(nextButton).toHaveAttribute('disabled');
  });
});
