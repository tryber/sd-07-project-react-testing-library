import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemonArray from '../data';

const favorites = {
  25: true,
  4: true,
  10: false,
};

const pokemons = [pokemonArray[0], pokemonArray[1], pokemonArray[2]];

describe('Pokedex must Have a title', () => {
  it('should contain an h2 and with Encountered pokémons text', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />,
    );
    const h2Text = getByText(/Encountered pokémons/i);
    expect(h2Text).toBeInTheDocument();
    expect(h2Text.tagName).toBe('H2');
  });
});

describe('Render next pokemon when click in button `Próximo pokémon`', () => {
  it('should have a button with the `Próximo pokémon`', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />,
    );
    const nextPokemonButton = getByTestId('next-pokemon');
    expect(nextPokemonButton).toBeInTheDocument();
    expect(nextPokemonButton).toHaveTextContent(/Próximo pokémon/i);
  });

  it('should show the next pokémon on list if clicked in `Próximo pokémon``', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />,
    );
    const nextPokemonButton = getByTestId('next-pokemon');
    let pokemonName = getAllByTestId('pokemon-name');
    expect(pokemonName[0]).toHaveTextContent(/Pikachu/i);

    fireEvent.click(nextPokemonButton);
    pokemonName = getAllByTestId('pokemon-name');
    expect(pokemonName[0]).toHaveTextContent(/Charmander/i);

    fireEvent.click(nextPokemonButton);
    pokemonName = getAllByTestId('pokemon-name');
    expect(pokemonName[0]).toHaveTextContent(/Caterpie/i);

    fireEvent.click(nextPokemonButton);
    pokemonName = getAllByTestId('pokemon-name');
    expect(pokemonName[0]).toHaveTextContent(/Pikachu/i);
  });

  it('should render only one Pokémon at a time.', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />,
    );
    const pokemonName = getAllByTestId('pokemon-name');
    expect(pokemonName).toHaveLength(1);
  });
});

describe('The pokedex need filters buttons', () => {
  it('should have filters buttons', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />,
    );
    const buttonsArray = getAllByTestId('pokemon-type-button');
    const [eletric, fire, bug] = buttonsArray;
    expect(eletric).toBeInTheDocument();
    expect(fire).toBeInTheDocument();
    expect(bug).toBeInTheDocument();
    expect(eletric).toHaveTextContent(/Electric/i);
    expect(fire).toHaveTextContent(/Fire/i);
    expect(bug).toHaveTextContent(/Bug/i);

    fireEvent.click(eletric);
    let pokemonName = getAllByTestId('pokemon-name');
    expect(pokemonName[0]).toHaveTextContent(/Pikachu/i);

    fireEvent.click(fire);
    pokemonName = getAllByTestId('pokemon-name');
    expect(pokemonName[0]).toHaveTextContent(/Charmander/i);

    fireEvent.click(bug);
    pokemonName = getAllByTestId('pokemon-name');
    expect(pokemonName[0]).toHaveTextContent(/Caterpie/i);
  });
});

describe('The Pokedex must have an All filter button to reset', () => {
  it('should have an button All to reset filter', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />,
    );
    const buttonAll = getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
    expect(buttonAll).toHaveTextContent(/All/i);
  });

  it('should show all pokemons when clicking on All button', () => {
    const { getByTestId, getAllByTestId, getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />,
    );

    const buttonAll = getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
    fireEvent.click(buttonAll);

    const nextPokemonButton = getByTestId('next-pokemon');
    let pokemonName = getAllByTestId('pokemon-name');
    expect(pokemonName[0]).toHaveTextContent(/Pikachu/i);

    fireEvent.click(nextPokemonButton);
    pokemonName = getAllByTestId('pokemon-name');
    expect(pokemonName[0]).toHaveTextContent(/Charmander/i);

    fireEvent.click(nextPokemonButton);
    pokemonName = getAllByTestId('pokemon-name');
    expect(pokemonName[0]).toHaveTextContent(/Caterpie/i);
  });

  it('should have `all` button as the current selected in page Loading', () => {
    const { getByTestId, getAllByTestId, getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />,
    );
    const buttonAll = getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
    const nextPokemonButton = getByTestId('next-pokemon');
    let pokemonName = getAllByTestId('pokemon-name');
    expect(pokemonName[0]).toHaveTextContent(/Pikachu/i);

    fireEvent.click(nextPokemonButton);
    pokemonName = getAllByTestId('pokemon-name');
    expect(pokemonName[0]).toHaveTextContent(/Charmander/i);

    fireEvent.click(nextPokemonButton);
    pokemonName = getAllByTestId('pokemon-name');
    expect(pokemonName[0]).toHaveTextContent(/Caterpie/i);
  });
});

describe('The application needs to have dynamic filter buttons', () => {
  it('should render the correct buttons on screen with  this pokemons', () => {
    const { getByRole, getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />,
    );
    const buttonAll = getByRole('button', { name: 'All' });
    const buttonArray = getAllByTestId('pokemon-type-button');
    expect(buttonAll).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const { type } = pokemon;
      const buttonFind = buttonArray.filter((button) => button.textContent === type);
      expect(buttonFind[0]).toBeInTheDocument();
    });
  });

  it('should have one button for each type of Pokemon', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />,
    );
    const buttonArray = getAllByTestId('pokemon-type-button');
    pokemons.forEach((pokemon) => {
      const { type } = pokemon;
      const buttonFind = buttonArray.filter((button) => button.textContent === type);
      expect(buttonFind.length).toBe(1);
    });
  });
});

describe('Deactive button if has 1 pokemon of that type', () => {
  it('should deactive button `Próximo pokémon` if has 1 pokemon of that type', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />,
    );
    const buttonArray = getAllByTestId('pokemon-type-button');
    const nextPokemonButton = getByTestId('next-pokemon');
    const eletric = buttonArray[0];
    fireEvent.click(eletric);
    expect(nextPokemonButton.disabled).toBeTruthy();
  });
});
