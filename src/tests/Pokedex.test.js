import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../components';

const pokemons = [
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
      'This intelligent Pokémon roasts hard berries with electricity.',
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
      'The flame on its tail shows the strength of its life force. If it is weak.',
  },
];

const favorite = {
  4: false,
  25: true,
};

test('The page contains an h2 heading with the text Encountered Pokémons', () => {
  const { container } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
  );
  const [h2Tag] = container.getElementsByTagName('h2');
  expect(h2Tag).toHaveTextContent('Encountered pokémons');
});

test('The next Pokémon in the list is displayed when the Next Pokémon button is clicked',
  () => {
    const { getByText, getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
    );

    const button = getByRole('button', { name: 'Próximo pokémon' });
    expect(button).toBeDefined();

    let pokemon = getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();

    fireEvent.click(button);
    pokemon = getByText(/Charmander/i);
    expect(pokemon).toBeInTheDocument();

    fireEvent.click(button);
    pokemon = getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });

test('Only one Pokémon is shown at a time', () => {
  const { getAllByTestId } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
  );
  const pokemon = getAllByTestId('pokemon-name');
  expect(pokemon).toHaveLength(1);
});

test('Pokédex has the filter buttons', () => {
  const { getByTestId, getByRole } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
  );
  const filterButtons = ['Electric', 'Fire'];

  filterButtons.forEach((filter) => {
    const button = getByRole('button', { name: filter });
    expect(button).toBeDefined();

    fireEvent.click(button);
    const type = getByTestId('pokemonType');
    expect(type).toHaveTextContent(filter);
  });
});

test('Pokédex contains a button to reset the filter', () => {
  const { getByRole, getByText } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
  );
  const button = getByRole('button', { name: 'All' });
  expect(button).toBeDefined();
  expect(button).toHaveTextContent('All');
  fireEvent.click(button);
  const pokemon = getByText(/Pikachu/i);
  expect(pokemon).toBeInTheDocument();
});

test('The Next Pokémon button should be disabled when the list has only one Pokémon',
  () => {
    const { getByRole, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
    );
    const button = getByRole('button', { name: 'Fire' });
    fireEvent.click(button);
    const nextButton = getByTestId('next-pokemon');
    expect(nextButton).toBeDisabled();
  });

test('A filter button is created for each type of Pokémon', () => {
  const { getAllByTestId, getByText } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
  );
  const ALL_TYPES = 2;

  expect(getAllByTestId('pokemon-type-button').length).toBe(ALL_TYPES);
  expect(getByText('All')).toBeInTheDocument();
});
