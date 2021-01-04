import React from 'react';
import { fireEvent } from '@testing-library/react';
import RenderWithRouter from '../RenderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('tests the use cases for the component Pokedex', () => {
  it('should render a h2 heading with `Encountered pokémons`', () => {
    const { getByText } = RenderWithRouter(<App />);
    const heading = getByText(/Encountered pokémons/i);
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  it('renders the next Pokémon when clicked on `Próximo pokemon`', () => {
    const { getByText } = RenderWithRouter(<App />);
    const pokedex = pokemons.map((pokemon) => pokemon.name);
    pokedex.forEach((pokemon) => {
      expect(getByText(pokemon)).toBeInTheDocument();
      fireEvent.click(getByText(/Próximo pokémon/i));
    });
    const pikachu = getByText(/pikachu/i);
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(pikachu).toBeInTheDocument();
  });

  it('should render only one pokemon at time', () => {
    const { getAllByTestId } = RenderWithRouter(<App />);
    const showedPokemon = getAllByTestId(/pokemon-name/i);
    const expectedLength = 1;
    expect(showedPokemon.length).toBe(expectedLength);
  });

  it('should have filter buttons', () => {
    const { getByText, getAllByTestId } = RenderWithRouter(<App />);
    const allPokemonsButton = getByText(/All/i);
    const pokemonTypesQuantity = 7;
    const typeButtons = getAllByTestId(/pokemon-type-button/i);
    expect(typeButtons.length).toBe(pokemonTypesQuantity);
    fireEvent.click(getByText(/Psychic/i));
    const alakazam = getByText(/Alakazam/i);
    expect(alakazam).toBeInTheDocument();
    expect(allPokemonsButton).toBeInTheDocument();
  });

  it('should have a reset button to show all pokemons', () => {
    const { getByText } = RenderWithRouter(<App />);
    const allPokemonsButton = getByText(/All/i);
    fireEvent.click(getByText(/Psychic/i));
    const alakazam = getByText(/Alakazam/i);
    expect(alakazam).toBeInTheDocument();
    fireEvent.click(allPokemonsButton);
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  it('should disabled `Próximo pokémon` button when there`s only one pokemon', () => {
    const { getByText, getByRole } = RenderWithRouter(<App />);
    const typeElectricButton = getByRole('button', { name: /Electric/i });
    fireEvent.click(typeElectricButton);
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const buttonNext = getByText(/Próximo pokémon/i);
    expect(buttonNext).toBeDisabled();
  });
});
