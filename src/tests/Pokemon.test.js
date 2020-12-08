import React from 'react';
// import { fireEvent } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';

// const pokemons = [
//     {
//       averageWeight: { value: '6.0', measurementUnit: 'kg' },
//       image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
//       name: 'Pikachu',
//       summary: 'This intelligent Pokémon roasts hard berries with electricity'
//       + 'to make them tender enough to eat.',
//       type: 'Electric',
//     },
//     {
//       averageWeight: { value: '8.5', measurementUnit: 'kg' },
//       image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
//       name: 'Charmander',
//       summary: 'The flame on its tail shows the strength of its life force.'
//       + 'If it is weak, the flame also burns weakly.',
//       type: 'Fire',
//     },
//     {
//       averageWeight: { value: '48.0', measurementUnit: 'kg' },
//       image: 'https://cdn.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
//       name: 'Alakazam',
//       summary: 'Closing both its eyes heightens all its other senses.'
//       + 'This enables it to use its abilities to their extremes.',
//       type: 'Psychic',
//     },
//   ];
const pokemon = {
  averageWeight: { value: '6.0', measurementUnit: 'kg' },
  image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  name: 'Pikachu',
  summary:
    'This intelligent Pokémon roasts hard berries with electricity'
    + 'to make them tender enough to eat.',
  type: 'Electric',
};

describe('Teste se é renderizado um card com as informações de'
+ 'determinado pokémon.', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela;', async () => {
    const { queryByTestId } = renderWithRouter(
      <Pokemon pokemon={ pokemon }  />,
    );
    await queryByTestId('pokemon-name');
    const pokemonName = queryByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
  test('O tipo correto do pokémon deve ser mostrado na tela.', async () => {
    const { queryByTestId } = renderWithRouter(
      <Pokemon pokemon={ pokemon }  />,
    );
    await queryByTestId('pokemonType');
    const pokemonType = queryByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent('Electric');
  });
  test('O peso médio do pokémon deve ser exibido com um texto no formato Average'
  + 'weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são,'
  + 'respectivamente, o peso médio do pokémon e sua unidade de medida', async () => {
    const { queryByTestId } = renderWithRouter(
      <Pokemon pokemon={ pokemon }  />,
    );
    await queryByTestId('pokemon-weight');
    const pokemonWeight = queryByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
  });
  test('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com '
  + 'a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do'
  + 'pokémon;', async () => {
    const { container } = renderWithRouter(
      <Pokemon pokemon={ pokemon } />,
    );
    await container.getElementsByTagName('img');
    const img = container.getElementsByTagName('img');
    expect(img[0].getAttribute('src')).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img[0].getAttribute('alt')).toBe('Pikachu sprite');
  });
});
