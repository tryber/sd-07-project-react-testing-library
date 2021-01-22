import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokédex from '../components/Pokedex';

const pokemon = [
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
    summary: `This intelligent Pokémon roasts hard berries 
    with electricity to make them tender enough to eat.`,
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
    summary: `The flame on its tail shows the strength 
    of its life force. If it is weak, the flame also burns weakly.`,
  },
];

const render = (bool = false) => renderWithRouter(
  <Pokédex pokemons={ pokemon } isPokemonFavoriteById={ { 25: bool, 4: false } } />,
);

test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  const { getByText } = render();
  const h2 = getByText(/Encountered pokémons/i);

  expect(h2).toBeInTheDocument();
});

test(`Teste se é exibido o próximo Pokémon da lista 
  quando o botão Próximo pokémon é clicado`, () => {
  const { getByTestId } = render();
  const btnNext = getByTestId(/next-pokemon/i);
  const pokemonName = getByTestId(/pokemon-name/i);

  expect(btnNext).toHaveTextContent('Próximo pokémon');
  expect(pokemonName).toHaveTextContent('Pikachu');
  fireEvent.click(btnNext);
  expect(pokemonName).toHaveTextContent('Charmander');
  fireEvent.click(btnNext);
  expect(pokemonName).toHaveTextContent('Pikachu');
});

test('Teste se é mostrado apenas um Pokémon por vez.', () => {
  const { getAllByTestId } = render();
  const pokemons = getAllByTestId(/pokemon-name/i);

  expect(pokemons).toHaveLength(1);
});

test('Teste se a Pokédex tem os botões de filtro', () => {
  const { getAllByTestId, getByTestId } = render();
  const pokemonName = getByTestId(/pokemon-name/i);
  const pokemonBtnType = getAllByTestId(/pokemon-type-button/i);

  fireEvent.click(pokemonBtnType[0]);
  expect(pokemonName).toHaveTextContent('Pikachu');
  fireEvent.click(pokemonBtnType[1]);
  expect(pokemonName).toHaveTextContent('Charmander');

  expect(pokemonBtnType[0]).toHaveTextContent('Electric');
  expect(pokemonBtnType[1]).toHaveTextContent('Fire');
});

test('Teste se a Pokédex tem os botões de filtro', () => {
  const { getByText, getAllByTestId, getByTestId } = render();
  const bntFilter = getByText(/All/i);
  const pokemonName = getByTestId(/pokemon-name/i);
  const pokemonBtnType = getAllByTestId(/pokemon-type-button/i);
  const btnNext = getByTestId(/next-pokemon/i);

  expect(btnNext).toBeEnabled();
  fireEvent.click(pokemonBtnType[0]);
  expect(pokemonName).toHaveTextContent('Pikachu');
  expect(btnNext).toBeDisabled();
  fireEvent.click(bntFilter);
  expect(btnNext).toBeEnabled();
});

test(`Teste se é criado, dinamicamente, um 
botão de filtro para cada tipo de Pokémon.`, () => {
  const { getAllByTestId, getByText } = render();
  const pokemonBtnType = getAllByTestId(/pokemon-type-button/i);
  const types = ['Electric', 'Fire'];
  const maxTypes = 2;
  const bntFilter = getByText(/All/i);

  expect(pokemonBtnType).toHaveLength(maxTypes);
  pokemonBtnType.forEach((pokemonType, index) => {
    expect(bntFilter).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(types[index]);
    fireEvent.click(pokemonType);
  });
});

test(`O botão de Próximo pokémon deve ser desabilitado 
quando a lista filtrada de Pokémons tiver um só pokémon.`, () => {
  const { getByTestId, getAllByTestId } = render();
  const btnNext = getByTestId(/next-pokemon/i);
  const pokemonBtnType = getAllByTestId(/pokemon-type-button/i);

  fireEvent.click(pokemonBtnType[0]);
  expect(btnNext).toBeDisabled();
});
