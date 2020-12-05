import React from 'react';

import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

import data from '../data';

describe('5. Pokedex.js file', () => {
  test('test if page contain h2', () => {
    const { getByText } = renderWithRouter(<App />);

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  test('test if its displayed the next pokemon', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const buttonNextPokem = getByText('Próximo pokémon');
    expect(buttonNextPokem).toBeInTheDocument();
    data.forEach(({ name, type }) => {
      expect(getByTestId('pokemon-name').innerHTML).toEqual(name);
      expect(getByTestId('pokemonType').innerHTML).toEqual(type);
      fireEvent.click(buttonNextPokem);
    });

    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  test('if there are filter buttons and it works', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const filterTypeButton = getAllByTestId('pokemon-type-button');
    const numberOfTypes = 7;
    const index = Math.ceil(Math.random() * numberOfTypes);

    fireEvent.click(filterTypeButton[index]);

    expect(getByTestId('pokemonType')).toBeInTheDocument();
  });

  test('if there is a reset filter button', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const allButton = getByText('All');

    fireEvent.click(allButton);

    const firstPokemon = data[0];
    expect(getByTestId('pokemon-name').innerHTML).toEqual(firstPokemon.name);
  });
});
