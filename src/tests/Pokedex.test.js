import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Testando o arquivo Pokedex.js', () => {
  const FavoritePokemonByIdList = {
    4: false,
    10: true,
    23: false,
    25: true,
    65: false,
    78: true,
    143: false,
    148: true,
    151: false,
  };

  it('a página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ FavoritePokemonByIdList }
    />);
    expect(getByRole('heading')).toHaveTextContent('Encountered pokémons');
  });

  it('é exibido o próximo Pokémon quando o botão Próximo pokémon é clicado', () => {
    const { getByTestId, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ FavoritePokemonByIdList }
    />);
    const nextPokemonButton = getByTestId('next-pokemon');
    expect(nextPokemonButton).toHaveTextContent('Próximo pokémon');

    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(nextPokemonButton);
    });

    expect(getByText(pokemons[0].name)).toBeInTheDocument();
  });

  it('é mostrado apenas um Pokémon por vez', () => {
    const { queryAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ FavoritePokemonByIdList }
    />);
    expect(queryAllByTestId('pokemon-name').length).toBe(1);
  });

  it('a Pokédex tem os botões de filtro', () => {
    const { getByText, getAllByTestId, getByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ FavoritePokemonByIdList }
    />);
    const seven = 7;
    expect(getAllByTestId('pokemon-type-button').length).toBe(seven);

    const fireTypeButton = getAllByTestId('pokemon-type-button')[1];
    fireEvent.click(fireTypeButton);
    expect(getByTestId('pokemonType')).toHaveTextContent('Fire');
    expect(getByText('Charmander')).toBeInTheDocument();

    fireEvent.click(getByTestId('next-pokemon'));

    expect(getByText('Rapidash')).toBeInTheDocument();
  });

  it('a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText, getAllByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ FavoritePokemonByIdList }
    />);

    const allButton = getAllByRole('button')[0];
    expect(allButton).toBeInTheDocument();
    expect(allButton).toHaveTextContent('All');

    fireEvent.click(allButton);

    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {
    const { queryAllByTestId, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ FavoritePokemonByIdList }
    />);

    const pokemonsType = queryAllByTestId('pokemon-type-button');
    expect(getByText('All')).toBeInTheDocument();
    expect(pokemonsType[0]).toHaveTextContent('Electric');
    expect(pokemonsType[1]).toHaveTextContent('Fire');
    expect(pokemonsType[2]).not.toHaveTextContent('Fire');
    expect(pokemonsType[3]).toHaveTextContent('Poison');
    expect(pokemonsType[4]).not.toHaveTextContent('Normal');
    expect(pokemonsType[5]).toHaveTextContent('Normal');
    expect(pokemonsType[6]).toHaveTextContent('Dragon');
  });

  it('o botão de Próximo pokémon é desabilitado quando tiver um só pokémon', () => {
    const { getAllByTestId, getByText, getByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ FavoritePokemonByIdList }
    />);

    const electricTypeButton = getAllByTestId('pokemon-type-button')[0];

    fireEvent.click(electricTypeButton);
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getByTestId('next-pokemon')).toBeDisabled();
  });
});
