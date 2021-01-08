import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Testes do component Pokedex', () => {
  test('Teste se página possui h2 com texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ [pokemons[0]] }
      isPokemonFavoriteById={ { 25: false } }
    />);

    const h2 = getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });
    expect(h2).toBeInTheDocument();
  });

  test('Teste se é exibido proximo pokemon ao clicar no botão', () => {
    const { getByText } = renderWithRouter(<Pokedex
      pokemons={ [pokemons[0], pokemons[1]] }
      isPokemonFavoriteById={ { 25: false, 4: false } }
    />);

    const poke1 = getByText(/Pikachu/i);
    expect(poke1).toBeInTheDocument();

    const button = getByText(/Próximo pokémon/i);
    fireEvent.click(button);

    const poke2 = getByText(/Charmander/i);
    expect(poke2).toBeInTheDocument();

    fireEvent.click(button);

    const poke3 = getByText(/Pikachu/i);
    expect(poke3).toBeInTheDocument();
  });

  test('Teste se é exibido um pokemon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ [pokemons[0], pokemons[1]] }
      isPokemonFavoriteById={ { 25: false, 4: false } }
    />);

    const pokemon = getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  test('Teste se pokedex possui botões de filtro', () => {
    const { getAllByTestId, getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ [pokemons[0], pokemons[1], pokemons[6]] }
      isPokemonFavoriteById={ { 25: false, 4: false, 78: false } }
    />);

    const pokeLength = 2;
    const typeFire = getAllByTestId('pokemon-type-button');
    expect(typeFire.length).toBe(pokeLength);

    const buttonFire = getByRole('button', { name: 'Fire' });
    fireEvent.click(buttonFire);

    const poke = getByText(/Charmander/i);
    expect(poke).toBeInTheDocument();

    const nextPoke = getByRole('button', { name: 'Próximo pokémon' });
    fireEvent.click(nextPoke);

    const poke2 = getByText(/Rapidash/i);
    expect(poke2).toBeInTheDocument();
  });

  test('Teste se pokedex possui botão de reset de filtro', () => {
    const { getByRole, getByText } = renderWithRouter(<Pokedex
      pokemons={ [pokemons[0], pokemons[1], pokemons[6]] }
      isPokemonFavoriteById={ { 25: false, 4: false, 78: false } }
    />);

    const resetButton = getByRole('button', { name: 'All' });
    expect(resetButton).toBeInTheDocument();

    const nextPoke = getByRole('button', { name: 'Próximo pokémon' });
    expect(nextPoke).toBeInTheDocument();

    fireEvent.click(resetButton);
    const poke = getByText(/Pikachu/i);
    expect(poke).toBeInTheDocument();

    fireEvent.click(nextPoke);
    const poke2 = getByText(/Charmander/i);
    expect(poke2).toBeInTheDocument();

    fireEvent.click(nextPoke);
    const poke3 = getByText(/Rapidash/i);
    expect(poke3).toBeInTheDocument();
  });

  test('Teste se criado dinamicamente botão de filtro para cada tipo pokémon', () => {
    const { getByRole, getByTestId } = renderWithRouter(<Pokedex
      pokemons={ [pokemons[0], pokemons[1]] }
      isPokemonFavoriteById={ { 25: false, 4: false } }
    />);

    const all = getByRole('button', { name: 'All' });
    expect(all).toBeInTheDocument();

    const ElectricButton = getByRole('button', { name: 'Electric' });
    expect(ElectricButton).toBeInTheDocument();

    fireEvent.click(ElectricButton);
    const pokeType = getByTestId('pokemonType');
    expect(pokeType).toHaveTextContent('Electric');

    expect(all).toBeInTheDocument();

    const fireButton = getByRole('button', { name: 'Fire' });
    expect(fireButton).toBeInTheDocument();

    fireEvent.click(fireButton);
    const pokeType2 = getByTestId('pokemonType');
    expect(pokeType2).toHaveTextContent('Fire');
  });

  test('Botão Próximo deve estar desabilitado quando ter apenas um pokemon', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ [pokemons[0]] }
      isPokemonFavoriteById={ { 25: false } }
    />);

    const nextPoke = getByRole('button', { name: 'Próximo pokémon' });
    expect(nextPoke).toBeInTheDocument();
    expect(nextPoke).toHaveAttribute('disabled');
  });
});
