import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import { FavoritePokemons } from '../components';

afterEach(cleanup);

describe('fifth requirement', () => {
  it('should render an heading H2 with the text `Encountered pokémons`', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokedexText = screen.getByText(/encountered pokémons/i);
    expect(pokedexText).toBeInTheDocument();
  });

  it('should render the next pokémon when press next button', () => {
    const mockedPokemons = [
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
        summary: `Closing both its eyes heightens all its other senses.
        This enables it to use its abilities to their extremes.`,
      },
    ];
    render(
      <MemoryRouter>
        <App />
        <FavoritePokemons pokemons={ mockedPokemons } />
      </MemoryRouter>,
    );
    const nextBtn = screen.getByText(/próximo pokémon/i);
    const pokemonNames = ['Snorlax', 'Caterpie', 'Alakazam', 'Snorlax'];
    expect(nextBtn).toBeInTheDocument();
    let index = 0;
    while (index <= (pokemonNames.length - 1)) {
      const cur = index;
      expect(screen.getByText(pokemonNames[cur])).toBeInTheDocument();
      fireEvent.click(nextBtn);
      index += 1;
    }
  });
});
