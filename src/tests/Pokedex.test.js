import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import App from '../App';
import PokemonData from '../data';
import PokemonDataTest from '../dataTest';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Testing Pokedex.js', () => {
  test('renders h2 with `Encountered pokémons`', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ PokemonData }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const title = getByText(/Encountered pokémons/i).tagName;
    expect(title).toBe('H2');
  });

  test('clicking on `Próximo pokémon`, shows the next pokemon', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText('Próximo pokémon'));
    expect(getByText('Charmander')).toBeInTheDocument();

    fireEvent.click(getByText('Próximo pokémon'));
    expect(getByText('Caterpie')).toBeInTheDocument();

    fireEvent.click(getByText('Próximo pokémon'));
    expect(getByText('Ekans')).toBeInTheDocument();

    fireEvent.click(getByText('Próximo pokémon'));
    expect(getByText('Alakazam')).toBeInTheDocument();

    fireEvent.click(getByText('Próximo pokémon'));
    expect(getByText('Mew')).toBeInTheDocument();

    fireEvent.click(getByText('Próximo pokémon'));
    expect(getByText('Rapidash')).toBeInTheDocument();

    fireEvent.click(getByText('Próximo pokémon'));
    expect(getByText('Snorlax')).toBeInTheDocument();

    fireEvent.click(getByText('Próximo pokémon'));
    expect(getByText('Dragonair')).toBeInTheDocument();
  });

  test('clicking `Próximo pokémon` on the last pokemon, shows the first pokemon ', () => {
    const { getByText } = renderWithRouter(<App />);

    PokemonData.forEach(() => fireEvent.click(getByText('Próximo pokémon')));

    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  test('only 1 pokemon shows at a time', () => {
    renderWithRouter(<App />);

    const PokedexLength = document.getElementsByClassName('pokemon').length;
    const size = 1;
    expect(PokedexLength).toBe(size);
  });

  test('pokemon type filters', () => {
    const { getByText, getByRole, getByTestId } = renderWithRouter(<App />);

    expect(getByText('All')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Electric' })).toBeInTheDocument();
    expect(getByText('Fire')).toBeInTheDocument();
    expect(getByText('Bug')).toBeInTheDocument();
    expect(getByText('Poison')).toBeInTheDocument();
    expect(getByText('Psychic')).toBeInTheDocument();
    expect(getByText('Normal')).toBeInTheDocument();
    expect(getByText('Dragon')).toBeInTheDocument();

    fireEvent.click(getByText('Fire'));
    fireEvent.click(getByText('Próximo pokémon'));
    expect(getByText('Rapidash')).toBeInTheDocument();
    expect(getByTestId('pokemonType')).toBeInTheDocument('fire');

    fireEvent.click(getByText('Psychic'));
    fireEvent.click(getByText('Próximo pokémon'));
    expect(getByText('Mew')).toBeInTheDocument();
    expect(getByTestId('pokemonType')).toBeInTheDocument('psychic');
  });

  test('clicking on `All`, resets the pokemon type filter', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText('Poison'));
    fireEvent.click(getByText('Normal'));
    fireEvent.click(getByText('All'));

    expect(getByText('Pikachu')).toBeInTheDocument();
  });
  test('onload pokemon type selected is `All`', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText('Próximo pokémon'));
    expect(getByText('Charmander')).toBeInTheDocument();

    fireEvent.click(getByText('Próximo pokémon'));
    expect(getByText('Caterpie')).toBeInTheDocument();
  });

  test('pokemon type filter btn is created dynamically', () => {
    const { getAllByTestId, queryByRole } = renderWithRouter(
      <Pokedex
        pokemons={ PokemonDataTest }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const pokemonBtnType = getAllByTestId('pokemon-type-button').length;
    const size = 6;

    expect(pokemonBtnType).toBe(size);
    expect(queryByRole('button', { name: 'Bug' })).toBeNull();
    expect(queryByRole('button', { name: 'All' })).not.toBeNull();
  });

  test('btn `Próximo pokémon`, is disable if there is one pokemon for a type', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    fireEvent.click(getByRole('button', { name: 'Normal' }));
    let nextbBtn = getByText('Próximo pokémon');
    expect(nextbBtn.disabled).toBe(true);

    fireEvent.click(getByRole('button', { name: 'Dragon' }));
    nextbBtn = getByText('Próximo pokémon');
    expect(nextbBtn.disabled).toBe(true);

    fireEvent.click(getByRole('button', { name: 'Fire' }));
    nextbBtn = getByText('Próximo pokémon');
    expect(nextbBtn.disabled).toBe(false);
  });
});
