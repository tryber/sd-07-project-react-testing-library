import React from 'react';
import { fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../renderWithRouter';

test('A página contém um heading h2 com o texto Encountered pokémons?', async () => {
  const pokemon = [
    {
      averageWeight: { value: '6.0', measurementUnit: 'kg' },
      image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      name: 'Pikachu',
      summary: 'This intelligent Pokémon roasts hard berries with'
      + 'electricity to make them tender enough to eat.',
      type: 'Electric' }];
  const { container } = renderWithRouter(
    <Pokedex pokemons={ pokemon } isPokemonFavoriteById={ 25 } />,
  );
  await container.querySelector('h2');
  expect(container.querySelector('h2')).toHaveTextContent('Encountered pokémons');
});

describe('Teste se é exibido o próximo Pokémon da lista quando'
+ 'o botão Próximo pokémon é clicado.', () => {
  const pokemon = [
    {
      averageWeight: { value: '6.0', measurementUnit: 'kg' },
      image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      name: 'Pikachu',
      summary: 'This intelligent Pokémon roasts hard berries with electricity'
      + 'to make them tender enough to eat.',
      type: 'Electric',
    },
    {
      averageWeight: { value: '8.5', measurementUnit: 'kg' },
      image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
      name: 'Charmander',
      summary: 'The flame on its tail shows the strength of its life force.'
      + 'If it is weak, the flame also burns weakly.',
      type: 'Fire',
    },
    {
      averageWeight: { value: '48.0', measurementUnit: 'kg' },
      image: 'https://cdn.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
      name: 'Alakazam',
      summary: 'Closing both its eyes heightens all its other senses.'
      + 'This enables it to use its abilities to their extremes.',
      type: 'Psychic',
    },
  ];
  test('O botão deve conter o texto Próximo pokémon', async () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemon } isPokemonFavoriteById={ 25 } />
    );
    await getByText('Próximo pokémon');
    expect(getByText(/Próximo pokémon/i)).toBeInTheDocument();
  });
  test('Os próximos Pokémons da lista devem ser mostrados, um a um,'
  + 'ao clicar sucessivamente no botão', async () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemon } isPokemonFavoriteById={ 25 } />
    );
    await getByText('Próximo pokémon');
    fireEvent.click(getByText(/Próximo pokémon/i));
    await getByText('Charmander');
    fireEvent.click(getByText(/Próximo pokémon/i));
    await getByText('Alakazam');
  });
});
// Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado.

// O botão deve conter o texto Próximo pokémon;

// Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;

// O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
