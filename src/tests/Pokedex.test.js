import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

test('have title', () => {
  const { getByText } = renderWithRouter(<App />);

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('', () => {
  const { getByText } = renderWithRouter(<App />);

  const allPokemons = [...pokemons, ...pokemons];

  allPokemons.forEach(({ name }, index) => {
    const firstIndex = 0;
    if (index === firstIndex) {
      expect(getByText(name)).toBeInTheDocument();
    } else {
      fireEvent.click(getByText('Próximo pokémon'));
      expect(getByText(name)).toBeInTheDocument();
    }
  });
});

test('', () => {
  const { getAllByTestId } = renderWithRouter(<App />);

  expect(getAllByTestId('pokemon-name').length).toEqual(1);
});

test('', () => {
  const { getByText, getAllByTestId } = renderWithRouter(<App />);

  const allPokemonsTypes = pokemons.map((pokemon) => pokemon.type);
  const allTypes = allPokemonsTypes
    .filter((type, i) => allPokemonsTypes.indexOf(type) === i);

  allTypes.forEach((type) => {
    const buttonType = getAllByTestId('pokemon-type-button')
      .find((button) => button.innerHTML === type);
    expect(buttonType).toBeInTheDocument();
    fireEvent.click(buttonType);

    const pokemonsHaveType = pokemons.filter((pokemon) => pokemon.type === type);
    pokemonsHaveType.push(...pokemonsHaveType);
    pokemonsHaveType.forEach(({ name }, index) => {
      const firstIndex = 0;
      if (index === firstIndex) {
        expect(getByText(name)).toBeInTheDocument();
      } else {
        fireEvent.click(getByText('Próximo pokémon'));
        expect(getByText(name)).toBeInTheDocument();
      }
    });
  });
});

test('All', () => {
  const { getByText } = renderWithRouter(<App />);

  fireEvent.click(getByText('Bug'));

  expect(getByText('All')).toBeInTheDocument();
  fireEvent.click(getByText('All'));

  const allPokemons = [...pokemons, ...pokemons];

  allPokemons.forEach(({ name }, index) => {
    const firstIndex = 0;
    if (index === firstIndex) {
      expect(getByText(name)).toBeInTheDocument();
    } else {
      fireEvent.click(getByText('Próximo pokémon'));
      expect(getByText(name)).toBeInTheDocument();
    }
  });
});

test('', () => {
  const backUpPokemons = [...pokemons];
  const dois = 2;
  pokemons[0].type = 'xxxxxxx';
  pokemons[1].type = 'yyyyyy';
  pokemons.splice(dois, pokemons.length);

  const { getAllByTestId } = renderWithRouter(<App />);

  const buttonType = getAllByTestId('pokemon-type-button');
  expect(buttonType[0].innerHTML).toEqual('xxxxxxx');
  expect(buttonType[1].innerHTML).toEqual('yyyyyy');

  pokemons[0].type = 'Electric';
  pokemons[1].type = 'Fire';
  const zero = 0;
  pokemons.splice(zero, pokemons.length);
  pokemons.push(...backUpPokemons);
});

test('test', () => {
  const { getByText } = renderWithRouter(<App />);

  expect(getByText('Próximo pokémon').disabled).toEqual(false);
  fireEvent.click(getByText('Poison'));
  expect(getByText('Próximo pokémon').disabled).toEqual(true);
  fireEvent.click(getByText('Fire'));
  expect(getByText('Próximo pokémon').disabled).toEqual(false);
  fireEvent.click(getByText('Bug'));
  expect(getByText('Próximo pokémon').disabled).toEqual(true);
});