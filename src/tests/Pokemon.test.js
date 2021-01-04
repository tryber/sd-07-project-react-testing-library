import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

const pokemons = {
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

const isFavorite = {
  65: false,
};

describe('testes do arquivo Pokemon', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon.',
    () => {
      const { container, getByTestId } = renderWithRouter(<Pokemon
        pokemon={ pokemons }
        isFavorite={ isFavorite }
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

  test(`Teste se o card do Pokémon indicado na Pokédex 
  contém um link de navegação para exibir detalhes deste Pokémon.
  O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido`, () => {
    const { getByText, history } = renderWithRouter(<Pokemon
      pokemon={ pokemons }
      isFavorite={ isFavorite }
    />);
    const details = getByText(/More details/i);
    fireEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/65');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { container } = renderWithRouter(<Pokemon
      pokemon={ pokemons }
      isFavorite={ isFavorite }
    />);
    const [img] = container.getElementsByClassName('favorite-icon');
    expect(img).toBeDefined();
    expect(img).toHaveAttribute('src', '/star-icon.svg');
    expect(img.alt).toBe('Alakazam is marked as favorite');
  });
});
