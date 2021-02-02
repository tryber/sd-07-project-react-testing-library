import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';

const mockedPokemons = {
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
  summary: `Closing both its eyes heightens all its 
  other senses. This enables it to use its abilities to their extremes.`,
};

const mockedIsFavorite = {
  65: false,
};

describe('Test if a card with the information of a certain Pokémon is rendered', () => {
  test('Test if a card with the information of a certain Pokémon is rendered', () => {
    const { container, getByTestId } = renderWithRouter(<Pokemon
      pokemon={ mockedPokemons }
      isFavorite={ mockedIsFavorite }
    />);
    const namePokemon = getByTestId('pokemon-name');
    const typePokemon = getByTestId('pokemonType');
    const averageWeight = getByTestId('pokemon-weight');
    const [img] = container.getElementsByTagName('img');
    expect(namePokemon).toHaveTextContent('Alakazam');
    expect(typePokemon).toHaveTextContent('Psychic');
    expect(averageWeight).toHaveTextContent('Average weight: 48.0 kg');
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/8/88/Spr_5b_065_m.png');
    expect(img.alt).toBe('Alakazam sprite');
  });
  test('Pokémon card indicated on the contains a link to view details Pokémon', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon pokemon={ mockedPokemons } isFavorite={ false } />,
    );
    const details = getByText(/More details/i);
    fireEvent.click(details);
    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/65');
  });
  test('there is a star icon on favorite Pokémon', () => {
    const { container } = renderWithRouter(<Pokemon
      pokemon={ mockedPokemons }
      isFavorite={ mockedIsFavorite }
    />);
    const [img] = container.getElementsByClassName('favorite-icon');
    expect(img).toBeDefined();
    expect(img).toHaveAttribute('src', '/star-icon.svg');
    expect(img.alt).toBe('Alakazam is marked as favorite');
  });
});
