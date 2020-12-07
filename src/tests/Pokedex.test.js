import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemon from '../data';

describe('pokedex', () => {
  it('test h2', () => {
    const { getByText } = renderWithRouter(<App />);
    const about = getByText('Encountered pokémons');
    expect(about).toBeInTheDocument();
  });

  it('testando proximo pokemon', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const button = getByText('Próximo pokémon');
    let index;
    const cliks = 10;
    for (index = 1 - 1; index < cliks; index += 1) {
      let i;
      if (index < cliks - 1) {
        i = index;
      } else {
        i = 1 - 1;
      }
      const poke = getByTestId('pokemon-name');
      expect(poke.innerHTML).toEqual(pokemon[i].name);
      fireEvent.click(button);
    }
  });

  it('test buttontype', () => {
    const { getAllByTestId, getByTestId, getByText } = renderWithRouter(<App />);
    const about = getAllByTestId('pokemon-type-button');
    let index;
    for (index = 1 - 1; index < about.length; index += 1) {
      const all = getByText('All');
      expect(all).toBeInTheDocument();
      fireEvent.click(about[index]);
      const poketype = getByTestId('pokemonType');
      expect(poketype.innerHTML).toEqual(about[index].innerHTML);
    }
  });

  it('test all', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const about = getByText('All');
    expect(about).toBeInTheDocument();
    const button = getByTestId('next-pokemon');
    let index;
    const cliks = 10;
    for (index = 1 - 1; index < cliks; index += 1) {
      let i;
      if (index < cliks - 1) {
        i = index;
      } else {
        i = 1 - 1;
      }
      const poke = getByTestId('pokemon-name');
      expect(poke.innerHTML).toEqual(pokemon[i].name);
      fireEvent.click(button);
    }
    fireEvent.click(about);
    for (index = 1 - 1; index < cliks; index += 1) {
      let i;
      if (index < cliks - 1) {
        i = index;
      } else {
        i = 1 - 1;
      }
      const poke = getByTestId('pokemon-name');
      expect(poke.innerHTML).toEqual(pokemon[i].name);
      fireEvent.click(button);
    }
  });

  it('test botão desabilitado', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const about = getAllByTestId('pokemon-type-button');
    fireEvent.click(about[0]);
    const button = getByTestId('next-pokemon');
    fireEvent.click(button);
    const poke = getByTestId('pokemon-name');
    expect(poke.innerHTML).toEqual('Pikachu');
  });
});
