import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';

const mockPokemons = [
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
      'This intelligent ... to make them tender enough to eat.',
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
    moreInfo:
      'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
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
        map:
          'https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      },
    ],
    summary:
      'The flame on ... life force. If it is weak, the flame also burns weakly.',
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
        map:
          'https://cdn.bulbagarden.net/upload/a/ae/Johto_Ilex_Forest_Map.png',
      },
      {
        location: 'Johto National Park',
        map:
          'https://cdn.bulbagarden.net/upload/4/4e/Johto_National_Park_Map.png',
      },
    ],
    summary:
      'For protection, it releases ... enemies.',
  },
  {
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
        map:
          'https://cdn.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png',
      },
    ],
    summary:
      'It can freely ... large prey whole. It can become too heavy to move, however.',
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
        map:
          'https://cdn.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png',
      },
    ],
    summary:
      'Closing both its eyes heightens all its other senses. This enables ... extremes.',
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
        map:
          'https://cdn.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png',
      },
    ],
    summary:
      'Apparently, ... a strong desire to see it.',
  },
  {
    id: 78,
    name: 'Rapidash',
    type: 'Fire',
    averageWeight: {
      value: '95.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/5/58/Spr_5b_078.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Rapidash_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Route 28',
        map: 'https://cdn.bulbagarden.net/upload/5/5b/Kanto_Route_28_Map.png',
      },
      {
        location: 'Johto Mount Silver',
        map: 'https://cdn.bulbagarden.net/upload/9/95/Johto_Mt_Silver_Map.png',
      },
    ],
    summary:
      'At full gallop, ... incredibly fast.',
  },
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
        map:
          'https://cdn.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png',
      },
    ],
    summary:
      'What ... its hungry belly.',
  },
  {
    id: 148,
    name: 'Dragonair',
    type: 'Dragon',
    averageWeight: {
      value: '16.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/2/2c/Spr_5b_148.png',
    moreInfo:
      'https://bulbapedia.bulbagarden.net/wiki/Dragonair_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Johto Route 45',
        map: 'https://cdn.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png',
      },
      {
        location: 'Johto Dragons Den',
        map:
          'https://cdn.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png',
      },
    ],
    summary:
      'They ... instantly.',
  },
];

const mockFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Testa Pokedex.js', () => {
  it('testa se exibe um "h2" contendo "Encountered pokémons"', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ mockPokemons }
        isPokemonFavoriteById={ mockFavoriteById }
      />,
    );
    const heading = getByRole('heading', { level: 2 });

    expect(heading).toHaveTextContent('Encountered pokémons');
  });
  it('testa se exibe o próximo pokémon da lista quando clicar no botão', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ mockPokemons }
        isPokemonFavoriteById={ mockFavoriteById }
      />,
    );
    const btnNextPokemon = getByText('Próximo pokémon');
    fireEvent.click(btnNextPokemon);
    const nextPokemonByData = mockPokemons[1].name;
    const nextPokemon = getByText(nextPokemonByData);

    expect(nextPokemon).toBeInTheDocument();
  });
  it('testa se exibe apenas um pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ mockPokemons }
        isPokemonFavoriteById={ mockFavoriteById }
      />,
    );
    //  retorna '1' se existe apenas um elemento com tal test id.
    const boxesInTheDocument = getAllByTestId('pokemon-name');
    expect(boxesInTheDocument.length).toBe(1);
  });
  it('testa os botões de filtro', () => {
    const { getByRole, getByText, getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ mockPokemons }
        isPokemonFavoriteById={ mockFavoriteById }
      />,
    );

    const LENGTH = 7;
    const typeButtons = getAllByTestId('pokemon-type-button');
    expect(typeButtons.length).toBe(LENGTH);

    const filterBtn = getByRole('button', { name: 'Psychic' });
    fireEvent.click(filterBtn);
    const firstPokemon = getByText('Alakazam');
    expect(firstPokemon).toBeInTheDocument();

    const btnNextPokemon = getByText('Próximo pokémon');
    fireEvent.click(btnNextPokemon);
    const nextPokemon = getByText('Mew');
    expect(nextPokemon).toBeInTheDocument();

    fireEvent.click(btnNextPokemon);
    expect(firstPokemon).toBeInTheDocument();
  });
  it('testa botão para resetar o filtro', () => {
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ mockPokemons }
        isPokemonFavoriteById={ mockFavoriteById }
      />,
    );
    const noFilter = getByRole('button', { name: 'All' });
    fireEvent.click(noFilter);

    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();

    const btnNextPokemon = getByText('Próximo pokémon');
    fireEvent.click(btnNextPokemon);

    const charmander = getByText('Charmander');
    expect(charmander).toBeInTheDocument();
  });
  it('testa se botão de filtro para cada tipo é criado dinamicamente', () => {
    const { getByRole, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ [mockPokemons[0], mockPokemons[1]] }
        isPokemonFavoriteById={ mockFavoriteById }
      />,
    );

    const filteredAll = getByRole('button', { name: 'All' });
    expect(filteredAll).toBeInTheDocument();

    const filteredElectric = getByRole('button', { name: 'Electric' });
    expect(filteredElectric).toBeInTheDocument();

    fireEvent.click(filteredElectric);
    const typeElectricPokemon = getByTestId('pokemonType');
    expect(typeElectricPokemon).toBeInTheDocument();
    expect(typeElectricPokemon).toHaveTextContent('Electric');

    expect(filteredAll).toBeInTheDocument();

    const filteredFire = getByRole('button', { name: 'Fire' });
    expect(filteredFire).toBeInTheDocument();

    fireEvent.click(filteredFire);
    const typeFirePokemon = getByTestId('pokemonType');
    expect(typeFirePokemon).toBeInTheDocument();
    expect(typeFirePokemon).toHaveTextContent('Fire');

    expect(filteredAll).toBeInTheDocument();
  });
  it('testa funcionalidade que desabilita botão "Próximo pokémon"', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ [mockPokemons[0]] }
        isPokemonFavoriteById={ mockFavoriteById }
      />,
    );

    const btnDisabled = getByText('Próximo pokémon');
    expect(btnDisabled).toBeInTheDocument();
    expect(btnDisabled.disabled).toBeTruthy();
  });
});
