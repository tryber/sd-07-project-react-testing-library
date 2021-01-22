import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';

const pokemon = {
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
  summary: `This intelligent Pokémon roasts hard berries 
    with electricity to make them tender enough to eat.`,
};

const render = (bool = false) => renderWithRouter(
  <Pokemon pokemon={ pokemon } isFavorite={ bool } />,
);

test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
  const { getByTestId, getByAltText } = render();
  const name = getByTestId('pokemon-name');
  const type = getByTestId('pokemonType');
  const weight = getByTestId('pokemon-weight');
  const image = getByAltText(/Pikachu sprite/i);

  expect(name).toHaveTextContent(/Pikachu/i);
  expect(type).toHaveTextContent(/Electric/i);
  expect(weight).toHaveTextContent(/Average Weight: 6.0 kg/i);
  expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('Testando o link de detalhes.', () => {
  const { history, getByText } = render();
  const linkCard = getByText(/More details/i);
  const idPokemon = 25;

  expect(history.location.pathname).toBe('/');
  fireEvent.click(linkCard);
  expect(history.location.pathname).toBe('/pokemons/25');
  expect(pokemon.id).toBe(idPokemon);
});

test('Testando o icone de favorito', () => {
  const { container } = render(true);
  const favImage = container.querySelector('.favorite-icon');

  expect(favImage).toHaveAttribute('src', '/star-icon.svg');
  expect(favImage).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
