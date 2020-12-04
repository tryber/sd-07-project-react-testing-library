import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';

const pokefavorite = {
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

describe('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
  it('deve conter um h2 com o texto encountered pokemons', () => {
    const { container } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokefavorite }
      />,
    );
    const encountered = container.querySelector('h2');
    expect(encountered.textContent).toBe('Encountered pokémons');
  });
});

describe('Teste se é exibido o próximo Pokémon ao clicar Próximo pokémon', () => {
  it('O botão deve conter o texto Próximo pokémon', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokefavorite }
      />,
    );
    const button = getByTestId('next-pokemon');
    expect(button.textContent).toBe('Próximo pokémon');
  });
  it('Os próximos Pokémons da lista devem ser mostrados um a um', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokefavorite }
      />,
    );
    const button = getByTestId('next-pokemon');
    fireEvent.click(button);
    const pokeTwo = getByText(pokemons[1].name);
    expect(pokeTwo).toBeInTheDocument();
  });
  it('A lista deve dar um loop para o primeiro pokemon ao chegar no último', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokefavorite }
      />,
    );
    const button = getByTestId('next-pokemon');
    pokemons.forEach(() => fireEvent.click(button));
    const pokeOne = getByText(pokemons[0].name);
    expect(pokeOne).toBeInTheDocument();
  });
});

describe('Teste se é mostrado apenas um Pokémon por vez.', () => {
  it('Deve conter apenas um pokemon', () => {
    const { getAllByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokefavorite }
      />,
    );
    const encountered = getAllByText(/Average weight/);
    expect(encountered.length).toBe(1);
  });
});

describe('Teste se a Pokédex tem os botões de filtro', () => {
  it('Deve filtrar', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokefavorite }
      />,
    );
    const button = getByText('Bug');
    fireEvent.click(button);
    const encountered = getByText('Caterpie');
    expect(encountered).toBeInTheDocument();
  });
  it('O texto do botão deve corresponder ao nome do tipo', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokefavorite }
      />,
    );
    const button = getByText('Bug');
    fireEvent.click(button);
    const typeFound = getByTestId('pokemonType');
    expect(typeFound.textContent).toBe('Bug');
  });
});
describe('Teste se é criado, um botão de filtro para cada tipo de Pokémon.', () => {
  it('Os botões de filtragem devem ser dinâmicos;', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokefavorite }
      />,
    );
    const pokeTypes = pokemons.map((poke) => poke.type);
    const uniquePokeTypes = new Set(pokeTypes);
    const uniquePokeTypesArr = [...uniquePokeTypes];
    const encountered = getAllByTestId('pokemon-type-button');
    encountered.forEach((button) => {
      expect(uniquePokeTypesArr.includes(button.textContent)).toBe(true);
    });
  });
  it('sem repetição', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokefavorite }
      />,
    );
    const pokeTypes = pokemons.map((poke) => poke.type);
    const uniquePokeTypes = new Set(pokeTypes);
    const uniquePokeTypesArr = [...uniquePokeTypes];
    const encountered = getAllByTestId('pokemon-type-button')
      .map((button) => button.textContent);
    expect(uniquePokeTypesArr).toStrictEqual(encountered);
  });
  it('Um botão para cada um dos tipos e o botão All', () => {
    const { getAllByTestId, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokefavorite }
      />,
    );
    const pokeTypes = pokemons.map((poke) => poke.type);
    const uniquePokeTypes = new Set(pokeTypes);
    const uniquePokeTypesArr = [...uniquePokeTypes];
    const encountered = getAllByTestId('pokemon-type-button');
    encountered.forEach((button) => {
      expect(uniquePokeTypesArr.includes(button.textContent)).toBe(true);
    });
    expect(getByText('All')).toBeInTheDocument();
  });
});
describe('O botão de Próximo pokémon deve ser desabilitado', () => {
  it('quando a lista filtrada de Pokémons tiver um só pokémon.', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ pokefavorite }
      />,
    );
    const electButton = getAllByTestId('pokemon-type-button')[0];
    fireEvent.click(electButton);
    const nextPkm = getByTestId('next-pokemon');
    expect(nextPkm.disabled).toBe(true);
  });
});
