import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

test('Teste se a página contém um heading h2 com o texto `Encountered pokémons`', () => {
  const { getByRole } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
  );
  expect(getByRole('heading')).toHaveTextContent(/Encountered pokémons/i);
});

describe('Teste se é exibido o próximo Pokémon da lista', () => {
  it('O botão deve conter o texto `Próximo pokémon`', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    expect(getByText(/Próximo pokémon/i)).toBeInTheDocument();
  });

  it('Os Pokémons devem ser mostrados, sucessivamente, ao clicar no botão', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    pokemons.forEach((pokemon, index) => {
      const namePokemon = getByText(pokemon.name);
      expect(namePokemon).toBeInTheDocument();

      const btnNext = getByText(/Próximo pokémon/i);
      fireEvent.click(btnNext);

      const sizePokemons = pokemons.length;
      const indexNextPokemon = (index === sizePokemons - 1)
        ? ((index + 1) - sizePokemons)
        : (index + 1);

      const nameNextPokemon = getByText(pokemons[indexNextPokemon].name);
      expect(nameNextPokemon).toBeInTheDocument();
    });
  });
});

test('Teste se é mostrado apenas um Pokémon por vez', () => {
  const { getAllByTestId } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
  );
  expect(getAllByTestId('pokemon-name').length).toBe(1);
});

describe('Teste se a Pokédex tem os botões de filtro', () => {
  it('Deve existir um botão de filtragem para cada tipo de Pokémon', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const btnFilter = getAllByTestId('pokemon-type-button').length;
    const num = 7;
    expect(btnFilter).toBe(num);
  });

  it('A Pokédex deve circular somente pelos Pokémons do tipo selecionado', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const selectPokemonType = getByTestId('pokemonType');
    const nextPokemonType = getAllByTestId('pokemon-type-button');
    nextPokemonType.forEach((type) => {
      fireEvent.click(type);
      expect(type.textContent).toBe(selectPokemonType.textContent);
    });
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  it('O texto do botão deve ser `All`', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    expect(getByText(/All/i)).toBeInTheDocument();

    fireEvent.click(getByText(/All/i));
    expect(pokemons.length.toString()).toBe('9');
  });

  it('Mostrar os Pokémons sem filtro quando o botão All for clicado', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const nextPokemonType = getAllByTestId('next-pokemon');
    nextPokemonType.forEach((type) => {
      fireEvent.click(type);
      expect(type.textContent).toBe('Próximo pokémon');
    });
  });
});

test('Botão `Próximo pokémon` desabilita quando houver apenas um Pokémon', () => {
  const { getByText } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
  );
  const btnDragon = getByText('Dragon', { selector: 'button' });
  fireEvent.click(btnDragon);
  expect(getByText(/Próximo pokémon/i)).toBeDisabled();
});
