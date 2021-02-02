import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

afterEach(cleanup);

test('Testa se página contém heading "h2" com o texto "Encountered pokémons".', () => {
  const { getByRole } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ {} }
  />);

  const heading = getByRole('heading', { name: /Encountered pokémons/i });
  expect(heading).toBeInTheDocument();
});

describe(`Testa se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é
clicado.`, () => {
  it('O botão deve conter o texto Próximo pokémon;', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);

    const btnNextPokemon = getByRole('button', { name: /Próximo pokémon/i });
    expect(btnNextPokemon).toBeInTheDocument();
  });

  it(`Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar
  sucessivamente no botão;`, () => {
    const { getByTestId, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);
    const btnNextPokemon = getByTestId(/next-pokemon/i);
    fireEvent.click(btnNextPokemon);
    expect(getByText('Charmander')).toBeInTheDocument();

    fireEvent.click(btnNextPokemon);
    expect(getByText('Caterpie')).toBeInTheDocument();

    fireEvent.click(btnNextPokemon);
    expect(getByText('Ekans')).toBeInTheDocument();

    fireEvent.click(btnNextPokemon);
    expect(getByText('Alakazam')).toBeInTheDocument();

    fireEvent.click(btnNextPokemon);
    expect(getByText('Mew')).toBeInTheDocument();

    fireEvent.click(btnNextPokemon);
    expect(getByText('Rapidash')).toBeInTheDocument();

    fireEvent.click(btnNextPokemon);
    expect(getByText('Snorlax')).toBeInTheDocument();

    fireEvent.click(btnNextPokemon);
    expect(getByText('Dragonair')).toBeInTheDocument();

    fireEvent.click(btnNextPokemon);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});

test('Testa se é mostrado apenas um Pokémon por vez.', () => {
  const { queryByText } = renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ {} }
  />);

  const uniquePokemons = queryByText('Pikachu');
  expect(uniquePokemons).toBeInTheDocument();
  const notShowPokemon = queryByText('Charmander');
  expect(notShowPokemon).not.toBeInTheDocument();
});

describe('Testa se a Pokédex tem os botões de filtro.', () => {
  it(`A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos
pokémons daquele tipo;`, () => {
    const { queryByTestId, queryAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);
    let currentPokemon = queryByTestId('pokemon-name').innerHTML;
    const typeBtn = queryAllByTestId('pokemon-type-button');
    expect(currentPokemon).toBe(pokemons[0].name);
    fireEvent.click(typeBtn[1]);
    currentPokemon = queryByTestId('pokemon-name').innerHTML;
    expect(currentPokemon).toBe(pokemons[1].name);
    fireEvent.click(typeBtn[2]);
    currentPokemon = queryByTestId('pokemon-name').innerHTML;
    expect(currentPokemon).toBe(pokemons[2].name);
    fireEvent.click(typeBtn[3]);
    currentPokemon = queryByTestId('pokemon-name').innerHTML;
    expect(currentPokemon).toBe(pokemons[3].name);
    fireEvent.click(typeBtn[4]);
    currentPokemon = queryByTestId('pokemon-name').innerHTML;
    expect(currentPokemon).toBe(pokemons[4].name);
    fireEvent.click(typeBtn[5]);
    currentPokemon = queryByTestId('pokemon-name').innerHTML;
    expect(currentPokemon).toBe(pokemons[7].name);
    fireEvent.click(typeBtn[6]);
    currentPokemon = queryByTestId('pokemon-name').innerHTML;
    expect(currentPokemon).toBe(pokemons[8].name);
  });
});
