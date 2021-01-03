import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('A página contém um heading h2 com o texto Encountered pokémons', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText('Encountered pokémons');
  expect(heading).toBeInTheDocument();
  expect(heading.tagName).toBe('H2');
});

test('O próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
  const { getByTestId } = renderWithRouter(<App />);
  let firstPokemon = getByTestId('pokemon-name').innerHTML;
  const nxtPokemonButton = getByTestId('next-pokemon');
  expect(nxtPokemonButton.innerHTML).toBe('Próximo pokémon');
  userEvent.click(nxtPokemonButton);
  let secondPokemon = getByTestId('pokemon-name').innerHTML;
  while (firstPokemon !== 'Dragonair') {
    expect(firstPokemon === secondPokemon).toBe(false);
    firstPokemon = secondPokemon;
    userEvent.click(nxtPokemonButton);
    secondPokemon = getByTestId('pokemon-name').innerHTML;
  }
  expect(secondPokemon).toBe('Pikachu');
});

test('A Pokedéx só exibe um Pokémon por vez', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const pokemonsList = getAllByTestId('pokemon-name');
  expect(pokemonsList.length).toBe(1);
});

test('A Pokedéx tem os botões de filtro', () => {
  const { getAllByTestId, getByText, getByTestId } = renderWithRouter(<App />);

  const typesArray = [
    'Eletric',
    'Fire',
    'Bug',
    'Poison',
    'Psychic',
    'Normal',
    'Dragon',
  ];
  const nextPokemonButton = getByText('Próximo pokémon');
  const pokemonTypesButtons = getAllByTestId('pokemon-type-button');

  typesArray.forEach((type, index) => {
    expect(pokemonTypesButtons[index].innerHTML === type);
    userEvent.click(pokemonTypesButtons[index]);
    if (type === 'Psychic' || type === 'Fire') {
      const firstPokemon = getByTestId('pokemon-name');
      userEvent.click(nextPokemonButton);
      const secondPokemon = getByTestId('pokemon-name');
      expect(firstPokemon !== secondPokemon);
    }
  });
});
