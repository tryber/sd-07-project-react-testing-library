import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Pokedex } from '../components';
import renderWithRouter from '../renderWithRouter';
import pokemons from './fixtures/Pokemons';

const isPokemonFavoriteById = {
  4: false,
  78: false,
  65: false,
  151: false,
};

describe('Tests the elements of the Pokedex.js component:', () => {
  it('renders an H2 tag with `Encountered pokémons` text', () => {
    const { getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const subtitle = getByText(/Encountered pokémons/);
    expect(subtitle).toBeInTheDocument();
    expect(subtitle.tagName).toBe('H2');
  });

  describe('Displays next Pokémon when the Next Pokémon button is clicked:', () => {
    it('shows the next Pokémon when you successively click on the button', () => {
      const { getByTestId } = renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);

      let pokemonName = getByTestId(/pokemon-name/);
      expect(pokemonName.innerHTML).toBe('Charmander');

      const nextPokemonButton = getByTestId(/next-pokemon/);
      fireEvent.click(nextPokemonButton);

      pokemonName = getByTestId(/pokemon-name/);
      expect(pokemonName.innerHTML).toBe('Rapidash');
    });

    it('the button should contain the text `Next pokémon`', () => {
      const { getByTestId } = renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);
      const button = getByTestId('next-pokemon');
      expect(button).toBeInTheDocument();
      expect(button.innerHTML).toBe('Próximo pokémon');
    });

    it('shows the first pokemon, when the list ends and the button is clicked', () => {
      const { getByTestId } = renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);

      let pokemonName = getByTestId(/pokemon-name/);
      expect(pokemonName.innerHTML).toBe('Charmander');

      const nextPokemonButton = getByTestId(/next-pokemon/);
      fireEvent.click(nextPokemonButton);

      pokemonName = getByTestId(/pokemon-name/);
      expect(pokemonName.innerHTML).toBe('Rapidash');

      fireEvent.click(nextPokemonButton);
      fireEvent.click(nextPokemonButton);
      fireEvent.click(nextPokemonButton);
      expect(pokemonName.innerHTML).toBe('Charmander');
    });
  });

  it('tests if it shows only one Pokémon at a time', () => {
    const { getByTestId, queryByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const pokemonName = getByTestId(/pokemon-name/);
    expect(pokemonName.innerHTML).toBe('Charmander');

    const rapidash = queryByText(/Rapidash/);
    expect(rapidash).not.toBeInTheDocument();
  });

  describe('Tests if the page has all filter buttons:', () => {
    it('shows only the Pokémon of the selected category', () => {
      const { getByTestId, getByText, queryByText } = renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);
      const psychicButton = getByText(/Psychic/);
      fireEvent.click(psychicButton);

      const pokemonName = getByTestId(/pokemon-name/);
      expect(pokemonName.innerHTML).toBe('Alakazam');

      const nextPokemonButton = getByTestId(/next-pokemon/);
      fireEvent.click(nextPokemonButton);
      expect(pokemonName.innerHTML).toBe('Mew');
      const rapidash = queryByText(/Rapidash/);
      expect(rapidash).not.toBeInTheDocument();

      const allButton = getByText('All');
      fireEvent.click(allButton);
      const pokemonQuantity = 4;
      expect(pokemons.length).toEqual(pokemonQuantity);
    });
  });

  describe('Test if the Pokédex contains a button to reset the filter:', () => {
    it('The button text must be `All`', () => {
      const { getByRole } = renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);
      const allButton = getByRole('button', { name: 'All' });
      expect(allButton).toBeInTheDocument();
    });

    it('shows unfiltered pokemons by clicking the `All` button', () => {
      const { getByRole, getByTestId } = renderWithRouter(<Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />);

      const allButton = getByRole('button', { name: 'All' });
      fireEvent.click(allButton);
      const pokemonName = getByTestId(/pokemon-name/);
      expect(pokemonName.innerHTML).toBe('Charmander');

      const nextPokemonButton = getByRole('button', { name: 'Próximo pokémon' });
      fireEvent.click(nextPokemonButton);

      expect(pokemonName.innerHTML).toBe('Rapidash');
      fireEvent.click(nextPokemonButton);
      expect(pokemonName.innerHTML).toBe('Alakazam');
      fireEvent.click(nextPokemonButton);
      expect(pokemonName.innerHTML).toBe('Mew');
    });
  });

  // teste feito com a ajuda do código da Vanessa Bidinotto
  it('tests if there is a button for each category of pokemons', () => {
    const { getByText, getByRole, getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const psychicButton = getByRole('button', { name: 'Psychic' });
    expect(psychicButton).toBeInTheDocument();
    const fireButton = getByRole('button', { name: 'Fire' });
    expect(fireButton).toBeInTheDocument();

    const numberOfTypeButtons = 2;
    const buttonTypesID = getAllByTestId('pokemon-type-button');
    expect(buttonTypesID.length).toEqual(numberOfTypeButtons);

    fireEvent.click(psychicButton);
    expect(getByText('Alakazam')).toBeInTheDocument();
  });
});
