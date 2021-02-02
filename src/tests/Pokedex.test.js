import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Testando o arquivo Pokedex.js', () => {
  it('se a página tem um h2 com o texto Encoutered pokémons', () => {
    const pokemon = [pokemons[0]];
    renderWithRouter(
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ { 25: false } }
      />,
    );
    expect(screen.getByRole('heading', { level: 2 }))
      .toHaveTextContent('Encountered pokémons');
  });

  it('se é exibido o próximo pokemon quando clica no botão proximo pokemon', () => {
    const pokemon = [pokemons[0], pokemons[1]];
    renderWithRouter(
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ { 25: false, 4: false } }
      />,
    );
    const nextButton = screen.getByTestId('next-pokemon');

    expect(nextButton).toBeInTheDocument();
    expect(screen.getByText('Próximo pokémon')).toBeInTheDocument();

    fireEvent.click(nextButton);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

  it('se é mostrado apenas um Pokémon por vez', () => {
    const pokemon = [pokemons[0]];
    renderWithRouter(
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ { 25: false } }
      />,
    );

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
  });

  it('se a Pokédex tem os botões de filtro', () => {
    const pokemon = [pokemons[0], pokemons[1], pokemons[6]];
    renderWithRouter(
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ { 25: false, 4: false, 78: false } }
      />,
    );

    const filterButton = screen.getByRole('button', { name: 'Fire' });
    expect(filterButton).toBeInTheDocument();

    const numberOfType = 2;
    const Pokemonbutton = screen.getAllByTestId('pokemon-type-button');
    expect(Pokemonbutton.length).toEqual(numberOfType);

    fireEvent.click(filterButton);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

  it('se a Pokédex contém um botão para resetar o filtro', () => {
    const pokemon = [pokemons[0], pokemons[1]];
    renderWithRouter(
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ { 25: false, 4: false } }
      />,
    );

    const allPokemons = screen.getByText('All');
    expect(allPokemons).toBeInTheDocument();

    fireEvent.click(allPokemons);
    const numberOfPokemons = 2;
    expect(pokemon.length).toEqual(numberOfPokemons);
  });
});
