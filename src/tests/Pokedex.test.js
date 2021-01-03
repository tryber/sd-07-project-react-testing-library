import React from 'react';
import { fireEvent, getByTestId } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Testa o arquivo Pokedex.js', () => {
  it('Testa se a página tem um h2 com o texto Encoutered pokémons', () => {
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


  it('Testa se é mostrado apenas um Pokémon por vez', () => {
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

  it('Testa se a Pokédex tem os botões de filtro', () => {
    const pokemon = [pokemons[0], pokemons[1], pokemons[6]];
    const { getByText, getByRole, getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ { 25: false, 4: false, 78: false } }
      />,
    );

    const filterButton = getByRole('button', { name: 'Fire' });
    expect(filterButton).toBeInTheDocument();

    const numberOfType = 2;
    const buttonTypeId = getAllByTestId('pokemon-type-button');
    expect(buttonTypeId.length).toEqual(numberOfType);

    fireEvent.click(filterButton);
    expect(getByText('Charmander')).toBeInTheDocument();
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const pokemon = [pokemons[0], pokemons[1]];
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ { 25: false, 4: false } }
      />,
    );

    const allPokemons = getByText('All');
    expect(allPokemons).toBeInTheDocument();

    fireEvent.click(allPokemons);
    const numberOfPokemons = 2;
    expect(pokemon.length).toEqual(numberOfPokemons);
  });
});
