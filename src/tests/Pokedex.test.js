import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';

const isFavoriteOrNot = {
  25: false,
  4: true,
  10: false,
  23: false,
  65: false,
  151: true,
  78: false,
  143: false,
  148: false,
};

describe('Pokédex.js', () => {
  it('deve renderizar um heading com o texto `Encountered pokémons`', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoriteOrNot } />,
    );

    const heading = screen.getByText(/encountered pokémons/i);
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Encountered pokémons');
  });

  it(
    `deve renderizar o próximo pokémon quando o botão 'Próximo pokémon'
    é clicado`,
    () => {
      renderWithRouter(
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoriteOrNot } />,
      );

      const nextPokemonButton = screen.getByText(/próximo pokémon/i);
      const pokemon = screen.getAllByTestId(/pokemon-name/i);

      expect(nextPokemonButton.textContent).toBe('Próximo pokémon');
      expect(pokemon[1]).toBe(undefined);

      pokemons.forEach(() => fireEvent.click(nextPokemonButton));

      expect(pokemon[0].textContent).toBe('Pikachu');
    },
  );

  it('deve renderizar apenas um pokémon por vez', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoriteOrNot } />,
    );

    const nextPokemonButton = screen.getByText(/próximo pokémon/i);
    const pokemon = screen.getAllByTestId(/pokemon-name/i);

    pokemons.forEach(() => {
      fireEvent.click(nextPokemonButton);
      expect(pokemon[1]).toBe(undefined);
    });
  });

  it('testa botões de filtro', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoriteOrNot } />,
    );

    const nextButton = screen.getByText(/próximo pokémon/i);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons[4].textContent).toBe('Psychic');

    fireEvent.click(filterButtons[4]);

    const pokemonType = screen.getByTestId('pokemonType');
    expect(pokemonType.textContent).toBe('Psychic');

    fireEvent.click(nextButton);

    expect(pokemonType.textContent).toBe('Psychic');
  });

  it('botão all deve existir e resetar o filtro', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoriteOrNot } />,
    );

    const nextButton = screen.getByText(/próximo pokémon/i);
    const buttonAll = screen.getByText('All');

    expect(buttonAll.textContent).toBe('All');
    expect(buttonAll).toBeInTheDocument();

    fireEvent.click(buttonAll);

    const pokemonType = screen.getByTestId(/pokemontype/i);
    expect(pokemonType.textContent).toBe('Electric');

    fireEvent.click(nextButton);

    expect(pokemonType.textContent).not.toBe('Electric');
  });

  it('deve ser renderizado um botão de filtro para cada tipo de pokémon', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoriteOrNot } />,
    );

    const filterTypes = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    const allButton = screen.getByText(/all/i);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');

    filterButtons.forEach((button, index) => {
      expect(button.textContent).toBe(filterTypes[index]);
      expect(allButton).toBeInTheDocument();
    });
  });

  it(
    `botão de próximo pokémon deve estar desabilitado quando existir
    apenas um do tipo`,
    () => {
      renderWithRouter(
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavoriteOrNot } />,
      );

      const uniquePokemons = [
        'Electric',
        'Bug',
        'Poison',
        'Normal',
        'Dragon',
      ];

      uniquePokemons.forEach(() => {
        const nextButton = screen.queryByTestId(/next-pokemon/i);
        expect(nextButton.disabled).toBe(false);
      });
    },
  );
});
