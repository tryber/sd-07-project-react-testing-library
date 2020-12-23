import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testing Pokedex page', () => {
  test('page contains a tag "h2" with text "Encountered pokémons"', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Encountered pokémons/i);
    expect(heading).toBeInTheDocument();
  });

  test('next pokemon is shown when the "Próximo pokémon" button is clicked', () => {
    const { getByText } = renderWithRouter(<App />);

    pokemons.forEach((pokemon) => {
      const nextPokemon = getByText(pokemon.name);
      fireEvent.click(getByText(/Próximo pokémon/i));
      expect(nextPokemon).toBeInTheDocument();
    });

    const firstPokemon = getByText(pokemons[0].name);
    expect(firstPokemon).toBeInTheDocument();
  });

  test('shows only one pokémon at a time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const onlyOne = 1;

    const onePokemon = getAllByTestId(/pokemon-name/i);
    expect(onePokemon.length).toBe(onlyOne);
  });

  test('the Pokédex contains filter buttons', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Fire/i));

    const pokemonType = getByTestId(/pokemonType/i);
    expect(pokemonType).toBeInTheDocument();

    const nameFirstPokemon = getByText(/Charmander/i);
    expect(nameFirstPokemon).toBeInTheDocument();

    fireEvent.click(getByText(/Próximo pokémon/i));

    const nameNextPokemon = getByText(/Rapidash/i);
    expect(nameNextPokemon).toBeInTheDocument();
  });

  test('the Pokédex contains reset filter button', () => {
    const { getByText } = renderWithRouter(<App />);

    const allButton = getByText(/All/i);
    expect(allButton).toBeInTheDocument();

    fireEvent.click(allButton);
    const nameFirstPokemon = getByText(/Pikachu/i);
    expect(nameFirstPokemon).toBeInTheDocument();

    fireEvent.click(getByText(/Próximo pokémon/i));
    const nameNextPokemon = getByText(/Charmander/i);
    expect(nameNextPokemon).toBeInTheDocument();
  });

  test('a filter button is dynamically created for each type of Pokémon', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);

    const allButton = getByText(/All/i);
    expect(allButton).toBeInTheDocument();

    // const lengthTypeButton = 7;
    // ([...new Set(iterar ignorando os repetidos)]) source: https://vidafullstack.com.br/javascript/new-set-com-javascript/
    const lengthTypeButton = [...new Set(pokemons.map((pokemon) => pokemon.type))];
    const filterButtons = getAllByTestId(/pokemon-type-button/i);
    expect(filterButtons.length).toBe(lengthTypeButton.length);
  });

  test('"Próximo pokémon" button should be disabled if it has only one pokemon', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    fireEvent.click(getByRole('button', { name: 'Electric' }));

    const onlyOnePokemon = getByText(/Próximo pokémon/i);
    expect(onlyOnePokemon).toBeDisabled();
  });
});
