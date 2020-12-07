import React from 'react';
import renderWithRouter from './renderWithRouter';
import { fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const favoriteList = {
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

describe('check if `Pokédex` component is working correctly', () => {
  it('check if `Pokedéx` has an h2 tag with the text `Encountered pokémons`', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoriteList }
      />
    );
    const encounteredPokemons = getByText(/Encountered pokémons/i);
    expect(encounteredPokemons).toBeInTheDocument();
    expect(encounteredPokemons.tagName).toBe('H2');
  });

  it('check if button `Próximo pokémon` skip to next pokémon', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoriteList }
      />
    );
    const firstPokemon = getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
    
    fireEvent.click(getByText(/Próximo pokémon/i));
    const secondPokemon = getByText(/Charmander/i);
    expect(secondPokemon).toBeInTheDocument();

    fireEvent.click(getByText(/Próximo pokémon/i));
    const thirdPokemon = getByText(/Caterpie/i);
    expect(thirdPokemon).toBeInTheDocument();

    fireEvent.click(getByText(/Próximo pokémon/i));
    const fourthPokemon = getByText(/Ekans/i);
    expect(fourthPokemon).toBeInTheDocument();

    fireEvent.click(getByText(/Próximo pokémon/i));
    const fifthPokemon = getByText(/Alakazam/i);
    expect(fifthPokemon).toBeInTheDocument();

    fireEvent.click(getByText(/Próximo pokémon/i));
    const sixthPokemon = getByText(/Mew/i);
    expect(sixthPokemon).toBeInTheDocument();

    fireEvent.click(getByText(/Próximo pokémon/i));
    const seventhPokemon = getByText(/Rapidash/i);
    expect(seventhPokemon).toBeInTheDocument();

    fireEvent.click(getByText(/Próximo pokémon/i));
    const eighthPokemon = getByText(/Snorlax/i);
    expect(eighthPokemon).toBeInTheDocument();

    fireEvent.click(getByText(/Próximo pokémon/i));
    const ninthPokemon = getByText(/Dragonair/i);
    expect(ninthPokemon).toBeInTheDocument();
    
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(firstPokemon).toBeInTheDocument();
  });

  it('should shown just one pokémon each time', () => {
    const { getAllByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoriteList }
      />
    );
    const pokemon = getAllByText(/Average/i);
    expect(pokemon).toHaveLength(1);
  });

  it('check if the pokédex have filters', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoriteList }
      />
    );
    const allFilter = getByTestId('');
    expect(allFilter).toBeInTheDocument();

    const allTypesFilter = getAllByTestId('pokemon-type-button');
    expect(allTypesFilter[0]).toBeInTheDocument();
    expect(allTypesFilter[3]).toBeInTheDocument();
    expect(allTypesFilter[6]).toBeInTheDocument();
    expect(allTypesFilter).toHaveLength(7);
  });

  it('check if the filters are working', () => {
    const { getByText, getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoriteList }
      />
    );
    const allTypesFilter = getAllByTestId('pokemon-type-button');
    fireEvent.click(allTypesFilter[1]);
    const firstFirePokemon = getByText(/Charmander/i);
    expect(firstFirePokemon).toBeInTheDocument();

    const skipPokemon = getByText(/Próximo pokémon/i);
    fireEvent.click(skipPokemon);
    const secondFirePokemon = getByText(/Rapidash/i);
    expect(secondFirePokemon).toBeInTheDocument();

    fireEvent.click(skipPokemon);
    expect(firstFirePokemon).toBeInTheDocument();

    fireEvent.click(allTypesFilter[4]);
    const firstPsychicPokemon = getByText(/Alakazam/i);
    expect(firstPsychicPokemon).toBeInTheDocument();

    fireEvent.click(skipPokemon);
    const secondPsychicPokemon = getByText(/Mew/i);
    expect(secondPsychicPokemon).toBeInTheDocument();

    fireEvent.click(allTypesFilter[2]);
    const bugPokemon = getByText(/Caterpie/i);
    expect(bugPokemon).toBeInTheDocument();

    fireEvent.click(skipPokemon);
    expect(bugPokemon).toBeInTheDocument();
  });

  it('should have one `All` button', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoriteList }
      />
    );

    const allButton = getByText(/All/i);
    expect(allButton).toBeInTheDocument();
  })

  it('should show all pokemons when `All` button is clicked', () => {
    const { getByText } = renderWithRouter(
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ favoriteList }
        />
      );
  
    const allButton = getByText(/All/i);
    const skipPokemon = getByText(/Próximo pokémon/i);
    const fireFilter = getByText(/Fire/i);
      
    fireEvent.click(fireFilter);
    fireEvent.click(skipPokemon);
    fireEvent.click(allButton);
      
    const firstPokemon = getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();

    fireEvent.click(skipPokemon);
    fireEvent.click(skipPokemon);

    const thirdPokemon = getByText(/Caterpie/i);
    expect(thirdPokemon).toBeInTheDocument();

    fireEvent.click(allButton);
    expect(firstPokemon).toBeInTheDocument();
  });

  it('check if filter buttons are dinamic created', () => {
    const { getByText, getAllByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoriteList }
      />
    );
    

    const electricArray = getAllByText(/Electric/i);
    const electricFilter = electricArray[1];
    const fireFilter = getByText(/Fire/i);
    const psychicFilter = getByText(/Psychic/i);
    const normalFilter = getByText(/Normal/i);
    const resetFilters = getByText(/All/i);
    expect(electricFilter).toBeInTheDocument();
    expect(fireFilter).toBeInTheDocument();
    expect(psychicFilter).toBeInTheDocument();
    expect(normalFilter).toBeInTheDocument();
    expect(resetFilters).toBeInTheDocument();

    const skipPokemon = getByText(/Próximo pokémon/i);
    fireEvent.click(skipPokemon);

    expect(resetFilters).toBeInTheDocument();

    fireEvent.click(electricFilter);
    const electricPokemon = getByText(/Pikachu/i);
    expect(electricPokemon).toBeInTheDocument();
    expect(resetFilters).toBeInTheDocument();

    fireEvent.click(normalFilter);
    const normalPokemon = getByText(/Snorlax/i);
    expect(normalPokemon).toBeInTheDocument();
    expect(resetFilters).toBeInTheDocument();

    fireEvent.click(fireFilter);
    fireEvent.click(skipPokemon);
    const secondFirePokemon = getByText(/Rapidash/i);
    expect(secondFirePokemon).toBeInTheDocument();
    expect(resetFilters).toBeInTheDocument();

    fireEvent.click(resetFilters);
    expect(electricPokemon).toBeInTheDocument();
    expect(resetFilters).toBeInTheDocument();
  })

  it('check if `Próximo pokémon` button is disabled when there is no next pokémon', () => {
    const { getByText, getAllByText } = renderWithRouter(
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ favoriteList }
        />
      );
    
    const electricArray = getAllByText(/Electric/i);
    const electricFilter = electricArray[1];
    const normalFilter = getByText(/Normal/i);
    const fireFilter = getByText(/Fire/i);
    const skipPokemon = getByText(/Próximo pokémon/i);

    fireEvent.click(electricFilter);
    expect(skipPokemon.disabled).toBeTruthy();

    fireEvent.click(normalFilter);
    expect(skipPokemon.disabled).toBeTruthy();

    fireEvent.click(fireFilter);
    fireEvent.click(skipPokemon);
    expect(skipPokemon.disabled).toBeFalsy();
  });
});
