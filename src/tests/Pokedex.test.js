import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('should contain a h2 heading with the text: Encountered pokémons ', () => {
  const { getByText } = renderWithRouter(<App />);

  const heading = getByText(/Encountered pokémons/);
  expect(heading).toBeInTheDocument();
});

it('should have a button all', () => {
  const { getByRole } = renderWithRouter(<App />);

  const allButton = getByRole('button', { name: /All/ });
  fireEvent.click(allButton);

  const nextPokemonButton = getByRole('button', { name: /Próximo pokémon/ });

  expect(allButton).toBeInTheDocument();
  expect(nextPokemonButton.disabled).toBe(false);
});

it('should have a button for all types of pokemons available',
  () => {
    const { getByRole } = renderWithRouter(<App />);
    const types = ['Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon'];

    const typesButton = types.map((type) => getByRole('button', { name: `${type}` }));

    typesButton.forEach((element) => {
      expect(element).toBeInTheDocument();
    });

    const allButton = getByRole('button', { name: /All/ });
    expect(allButton).toBeInTheDocument();
    expect(allButton.disabled).toBe(false);
  });

it('should disabled next pokemon button when exists only one pokemon in the Pokédex',
  () => {
    const { getByRole } = renderWithRouter(<App />);

    const poisonButton = getByRole('button', { name: /Poison/ });
    fireEvent.click(poisonButton);

    const nextPokemonButton = getByRole('button', { name: /Próximo pokémon/ });

    expect(nextPokemonButton.disabled).toBe(true);
  });

it('should have a cycled list when filtering a type of pokemon', () => {
  const { getByRole, getByTestId } = renderWithRouter(<App />);

  const fireButton = getByRole('button', { name: /Fire/ });
  fireEvent.click(fireButton);

  const firstFirePokemon = getByTestId('pokemon-name');

  const nextPokemonButton = getByRole('button', { name: /Próximo pokémon/ });
  fireEvent.click(nextPokemonButton);
  fireEvent.click(nextPokemonButton);

  const pokemon = getByTestId('pokemon-name');

  expect(firstFirePokemon).toBe(pokemon);
});

it('should have only one pokemon in the pokedex', () => {
  const { getByTestId } = renderWithRouter(<App />);

  const pokemon = getByTestId('pokemon-name');

  expect(pokemon).toBeInTheDocument();
});

it('should have a button for all types of pokemons available', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const totalOfTypes = 7;
  const types = getAllByTestId('pokemon-type-button');

  expect(types.length).toBe(totalOfTypes);
});
