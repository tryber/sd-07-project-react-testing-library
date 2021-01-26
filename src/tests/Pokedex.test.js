import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import Pokemon from '../data';

describe('Testing the Pokedex.js file', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ Pokemon }
      isPokemonFavoriteById={ { 25: false } }
    />);
    expect(getByRole('heading', { name: 'Encountered pokémons' })).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista', () => {
    const pokemon = [Pokemon[0], Pokemon[1]];
    const { getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemon }
      isPokemonFavoriteById={ { 25: false, 4: false } }
    />);
    const pokemonDefault = getByText('Pikachu');
    expect(pokemonDefault).toBeInTheDocument();

    const nextPokemonBtn = getByText('Próximo pokémon');
    fireEvent.click(nextPokemonBtn);

    const nextPokemon = getByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ [Pokemon[0], Pokemon[1]] }
      isPokemonFavoriteById={ { 25: false, 4: false } }
    />);

    const pokemon = getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
  });
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    const pokemon = [Pokemon[0], Pokemon[1], Pokemon[6]];
    const { getByText, getAllByTestId, getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemon }
      isPokemonFavoriteById={ { 25: false, 4: false, 78: false } }
    />);

    const typeButton = getAllByTestId('pokemon-type-button');
    const fireFilter = getByRole('button', { name: 'Fire' });

    const pokemonLength = 2;

    fireEvent.click(fireFilter);
    expect(typeButton).toHaveLength(pokemonLength);
    expect(getByText('Charmander')).toBeInTheDocument();
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const pokemons = [Pokemon[0], Pokemon[1]];
    const { getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ { 25: false, 4: false } }
    />);

    const allBtn = getByText('All');
    expect(allBtn).toBeInTheDocument();

    fireEvent.click(allBtn);
    const pokemonLength = 2;
    expect(pokemons.length).toEqual(pokemonLength);
  });
});
