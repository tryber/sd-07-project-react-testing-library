import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const two = 2;

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

test('A Pokédex contém um botão para resetar o filtro', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);

  const allButton = getByText('All');
  expect(allButton).toBeInTheDocument();

  let firstPokemon = getByTestId('pokemon-name').innerHTML;
  const nextPokemonButton = getByText('Próximo pokémon');
  userEvent.click(nextPokemonButton);
  let secondPokemon = getByTestId('pokemon-name').innerHTML;
  while (firstPokemon !== 'Dragonair') {
    expect(firstPokemon === secondPokemon).toBe(false);
    firstPokemon = secondPokemon;
    userEvent.click(nextPokemonButton);
    secondPokemon = getByTestId('pokemon-name').innerHTML;
  }
  expect(secondPokemon).toBe('Pikachu');
});

test('é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {
  const { getAllByText, getByText, getByTestId } = renderWithRouter(<App />);

  let currentPokemon = getByText('Pikachu').innerHTML;
  const nextPokemonBtn = getByText('Próximo pokémon');
  const allButton = getByText('All');
  let pokemonTypeArray = getAllByText('Electric');
  expect(pokemonTypeArray.length).toBe(two);

  userEvent.click(nextPokemonBtn);

  while (currentPokemon !== 'Pikachu') {
    currentPokemon = getByTestId('pokemon-name').innerHTML;
    pokemonTypeArray = getAllByText(getByTestId('pokemonType').innerHTML);
    expect(pokemonTypeArray.length).toBe(two);
    userEvent.click(nextPokemonBtn);
  }

  expect(allButton).toBeInTheDocument();
});

test('O botão próximo pokemon é desabilitado quando só houver um pokémon do tipo', () => {
  const { getByText, getAllByTestId } = renderWithRouter(<App />);

  const buttonNxtPokemon = getByText('Próximo pokémon');
  const pokemonTypes = getAllByTestId('pokemon-type-button');

  pokemonTypes.forEach((type) => {
    userEvent.click(type);
    const typeText = type.innerHTML;

    if (
      typeText === 'Electric'
      || typeText === 'Bug'
      || typeText === 'Poison'
      || typeText === 'Normal'
      || typeText === 'Dragon '
    ) {
      expect(buttonNxtPokemon.disabled).toBe(true);
    }
  });
});
