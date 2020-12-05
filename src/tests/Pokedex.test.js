import { fireEvent } from '@testing-library/react';
import React from 'react';
import Pokedex from '../components/Pokedex';
import Pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Requisito 5', () => {
  it('renderiza o texto Encountered pokémons na tela', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ Pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const innerText = getByText('Próximo pokémon');
    expect(innerText).toBeInTheDocument();
    const text = getByText('Encountered pokémons');
    expect(text).toBeInTheDocument();
    expect(text.tagName.toLowerCase()).toBe('h2');
  });
  it('renderiza o próximo pokemon', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ Pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const button = getByTestId('next-pokemon');
    expect(button).toBeInTheDocument();
    expect(button);
    const pokemon = getByTestId('pokemon-name');
    fireEvent.click(button);
    expect(pokemon.textContent).toBe('Charmander');
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    expect(pokemon.textContent).toBe('Pikachu');
  });
  it('renderiza os botões de filtro', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ Pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const allButtons = getAllByTestId('pokemon-type-button');
    expect(allButtons[0].textContent).toBe('Electric');
    expect(allButtons[1].textContent).toBe('Fire');
    expect(allButtons[2].textContent).toBe('Bug');
    expect(allButtons[3].textContent).toBe('Poison');
    expect(allButtons[4].textContent).toBe('Psychic');
    expect(allButtons[5].textContent).toBe('Normal');
    expect(allButtons[6].textContent).toBe('Dragon');

    const pokemon = getByTestId('pokemon-name');
    const nextButton = getByTestId('next-pokemon');
    fireEvent.click(allButtons[4]);
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Mew');
  });
  it('renderiza um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ Pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const buttonAll = getByText('All');
    expect(buttonAll).toBeInTheDocument();
  });
  it('renderiza um botão de filtro para cada tipo de pokemon', () => {
    const { getAllByTestId, getByText, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ Pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const nextButton = getByTestId('next-pokemon');
    expect(nextButton.textContent).toBe('Próximo pokémon');
    const buttonAll = getByText('All');
    expect(buttonAll).toBeInTheDocument();
    const pokemon = getByTestId('pokemon-name');

    const allButtons = getAllByTestId('pokemon-type-button');
    expect(allButtons[0].textContent).toBe('Electric');
    expect(allButtons[1].textContent).toBe('Fire');
    expect(allButtons[2].textContent).toBe('Bug');
    expect(allButtons[3].textContent).toBe('Poison');
    expect(allButtons[4].textContent).toBe('Psychic');
    expect(allButtons[5].textContent).toBe('Normal');
    expect(allButtons[6].textContent).toBe('Dragon');

    fireEvent.click(buttonAll);
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Charmander');
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Caterpie');
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Ekans');
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Alakazam');
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Mew');
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Rapidash');
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Snorlax');
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Dragonair');
    fireEvent.click(nextButton);
    expect(pokemon.textContent).toBe('Pikachu');
  });
});
