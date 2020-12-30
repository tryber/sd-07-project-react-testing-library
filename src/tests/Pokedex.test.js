import React from 'react';
import { fireEvent, getAllByAltText, getByAltText } from '@testing-library/react';
import { Pokedex } from '../components';
import Pokemons from '../data';
import renderWhitRouter from '../RenderWhitRouter';
import pokemons from '../data';

describe('Testing pokedex features', () => {
  test('Testing if show heading', () => {
    const favoritePokemons = {};
    const { getByRole } = renderWhitRouter(<Pokedex
      pokemons={ Pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);

    const titleH2 = getByRole('heading', { level: 2 });
    expect(titleH2.textContent).toBe('Encountered pokémons');
  });

  test('Testing if show next pokémon', () => {
    const favoritePokemons = {};

    const { getByTestId, getByText } = renderWhitRouter(<Pokedex
      pokemons={ Pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);

    const nextButton = getByTestId('next-pokemon');
    expect(nextButton.textContent).toBe('Próximo pokémon');

    const allPokemons = getByText(/All/i);
    fireEvent.click(allPokemons);

    Pokemons.forEach((pokemon, index) => {
      const name = getByText(pokemon.name);
      expect(name).toBeInTheDocument();

      fireEvent.click(nextButton);
      const pokemonsLength = Pokemons.length;
      const next = index === pokemonsLength - 1 ? index - pokemonsLength + 1 : index + 1;

      const nextPokemon = getByText(Pokemons[next].name);
      expect(nextPokemon).toBeInTheDocument();
    });
  });

  test('Testing if one Pokémon is displayed at a time', () => {
    const favoritePokemons = {};
    const { getByTestId, getAllByTestId } = renderWhitRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);

    const names = getAllByTestId('pokemon-name');
    expect(names.length).toBe(1);

    const buttonNext = getByTestId('next-pokemon');
    fireEvent.click(buttonNext);

    const allNames = getAllByTestId('pokemon-name');
    expect(allNames.length).toBe(1); // melhorar nome da constante.
  });

  test('Test for filter buttons', () => {
    const favoritePokemons = {};

    const { getByTestId, getAllByTestId } = renderWhitRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);

    const buttons = getAllByTestId(/Pokemon-type-button/i);
    buttons.forEach((button) => {
      fireEvent.click(button);
      const type = getByTestId('pokemonType').textContent;
      const like = type === button.textContent;
      expect(like).toBe(true);
    });
  });

  test('exchange only for pokemons of the selected type', () => {
    const favoritePokemons = {};

    const { getByTestId, getAllByTestId } = renderWhitRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);

    const btns = getAllByTestId(/pokemon-type-button/i);
    const type = getByTestId(/pokemonType/i);

    btns.forEach((button) => {
      fireEvent.click(button);
      expect(button.textContent).toBe(type.textContent);
    });
  });

  test('Testing if the reset button is rendered', () => {
    const favoritePokemons = {};

    const { getByTestId, getByText } = renderWhitRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);

    const resetButton = getByText(/All/i);
    fireEvent.click(resetButton);
    const name = getByTestId(/pokemon-name/i).textContent;
    expect(name).toBe('Pikachu');
    const type = getByTestId(/pokemonType/i).textContent;
    expect(type).toBe('Electric');
  });

  test('Testing if there is a filter button for each type of pokemon', () => {
    const favoritePokemons = {};

    const { getAllByTestId } = renderWhitRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);
    const typesPokemon = pokemons.map((pokemon) => pokemon.type);
    const types = [...new Set(typesPokemon)].sort();

    const buttonFIlter = getAllByTestId(/pokemon-type-button/i)
      .map((button) => button.textContent)
      .sort();

    expect(types).toEqual(buttonFIlter);
  });

  test('Disable button', () => {
    const favoritePokemons = {};

    const { getByTestId, getAllByTestId } = renderWhitRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritePokemons }
    />);

    const typesPokemon = [
      'Electric',
      'Bug',
      'Poison',
      'Normal',
      'Dragon',
    ];

    const buttonsFilter = getAllByTestId(/pokemon-type-button/i);
    const nextPokemon = getByTestId(/next-pokemon/);

    buttonsFilter.forEach((filter) => {
      fireEvent.click(filter);
      if (typesPokemon.includes(filter.textContent)) {
        expect(nextPokemon).toHaveAttribute('disabled');
      }
    });
  });
});
