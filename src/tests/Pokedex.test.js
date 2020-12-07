import React from 'react';
import { fireEvent, getByTestId } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Testa o arquivo Pokedex.js', () => {
  it('testa se a página tem um h2 com o texto encoutered pokemons', () => {
    const pokemon = [pokemons[0]];
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ { 25: false } }
      />,
    );

    const heading = getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Encountered pokémons');
  });

  it('testa se é exibido o próximo pokemon quando clica no botão proximo pokemon', () => {
    const pokemon = [pokemons[0], pokemons[1]];
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ { 25: false, 4: false } }
      />,
    );

    const nextPokemonButton = getByTestId('next-pokemon');
    expect(nextPokemonButton).toBeInTheDocument();

    const proximoPokemon = getByText('Próximo pokémon');
    expect(proximoPokemon).toBeInTheDocument();

    fireEvent.click(nextPokemonButton);
    const nextPokemon = getByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();
  });

  it('testa se é mostrado apenas um pokemon por vez', () => {
    const pokemon = [pokemons[0]];
    const { getByText, queryByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ { 25: false } }
      />,
    );

    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    expect(queryByText('Charmander')).not.toBeInTheDocument();
  });

  it('testa se a pokedex tem um botão para resetar o filtro', () => {
    const pokemon = [pokemons[0], pokemons[1]];
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ { 25: false, 4: false } }
      />,
    );

    const all = getByText('All');
    expect(all).toBeInTheDocument();

    fireEvent.click(all);
    const pokemonQuantity = 2;
    expect(pokemon.length).toEqual(pokemonQuantity);
  });

  it('se existe um botão para cada tipo de pokemon', () => {
    const pokemon = [pokemons[0], pokemons[1], pokemons[6]];
    const { getByText, getByRole, getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ { 25: false, 4: false, 78: false } }
      />,
    );

    const btnType = getByRole('button', { name: 'Fire' });
    expect(btnType).toBeInTheDocument();

    const numberOfTypeButtons = 2;
    const btnTypeId = getAllByTestId('pokemon-type-button');
    expect(btnTypeId.length).toEqual(numberOfTypeButtons);

    fireEvent.click(btnType);
    expect(getByText('Charmander')).toBeInTheDocument();
  });
});
