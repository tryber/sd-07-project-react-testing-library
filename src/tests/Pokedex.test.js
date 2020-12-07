import React from 'react';
import { fireEvent, cleanup, getAllByTestId, getByText } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

afterEach(cleanup);

const isPokemonFavoriteById = {
  4: true,
  10: true,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  const { getByText } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
  );
  const h2 = getByText(/Encountered pokémons/);
  expect(h2.tagName).toBe('H2');
});

describe(`Teste se é exibido o próximo Pokémon da lista quando o 
botão Próximo pokémon é clicado.`, () => {
  it('O botão deve conter o texto Próximo pokémon', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const button = getByText(/Próximo pokémon/);
    expect(button).toBeInTheDocument();
  });

  it(`Os próximos Pokémons da lista devem ser mostrados, um a um, 
  ao clicar sucessivamente no botão + O primeiro Pokémon da lista 
  deve ser mostrado ao clicar no botão, se estiver no último Pokémon 
  da lista;`, () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const button = getByText(/Próximo pokémon/);
    pokemons.map((e) => {
      const name = getByText(e.name);
      expect(name).toBeInTheDocument();
      fireEvent.click(button);
      return e;
    });
    const firstName = getByText(pokemons[0].name);
    expect(firstName).toBeInTheDocument();
  });
});

describe('Teste se a Pokédex tem os botões de filtro.', () => {
  it('O texto do botão deve corresponder ao nome do tipo, ex. Psychic;', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const button = getByText(/Próximo pokémon/);
    expect(button).toBeInTheDocument();
  });

  it(`A partir da seleção de um botão de tipo, a Pokédex deve 
  circular somente pelos pokémons daquele tipo + O texto do botão 
  deve corresponder ao nome do tipo, ex. Psychic`, () => {
    const { getByText, getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    function filter(type) {
      const nextButton = getByText(/Próximo pokémon/);
      const filterButton = getByRole('button', { name: type });
      expect(filterButton).toBeInTheDocument();
      let filteredPokemon;
      fireEvent.click(filterButton);
      if (type !== 'All') {
        filteredPokemon = pokemons.filter((e) => e.type === type);
      } else filteredPokemon = pokemons;

      filteredPokemon.map((e) => {
        const name = getByText(e.name);
        expect(name).toBeInTheDocument();
        fireEvent.click(nextButton);
        return e;
      });
      const firstName = getByText(filteredPokemon[0].name);
      expect(firstName).toBeInTheDocument();
    }
    pokemons.map((pokemon) => filter(pokemon.type));
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  it('O texto do botão deve ser All', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const filterButton = getByRole('button', { name: 'All' });
    expect(filterButton).toBeInTheDocument();
  });
  it(`A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) 
  quando o botão All for clicado;`, () => {
    const { getByText, getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const filterButton = getByRole('button', { name: 'Fire' });
    fireEvent.click(filterButton);
    function filter(type) {
      const nextButton = getByText(/Próximo pokémon/);
      const filterButtonf = getByRole('button', { name: type });
      expect(filterButtonf).toBeInTheDocument();
      let filteredPokemon;
      fireEvent.click(filterButtonf);
      if (type !== 'All') {
        filteredPokemon = pokemons.filter((e) => e.type === type);
      } else filteredPokemon = pokemons;

      filteredPokemon.map((e) => {
        const name = getByText(e.name);
        expect(name).toBeInTheDocument();
        fireEvent.click(nextButton);
        return e;
      });
      const firstName = getByText(filteredPokemon[0].name);
      expect(firstName).toBeInTheDocument();
    }
    filter('All');
  });

  it('Ao carregar a página, o filtro selecionado deverá ser All', () => {
    const { getByText, getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    function filter(type) {
      const nextButton = getByText(/Próximo pokémon/);
      const filterButton = getByRole('button', { name: type });
      expect(filterButton).toBeInTheDocument();
      let filteredPokemon;
      fireEvent.click(filterButton);
      if (type !== 'All') {
        filteredPokemon = pokemons.filter((e) => e.type === type);
      } else filteredPokemon = pokemons;

      filteredPokemon.map((e) => {
        const name = getByText(e.name);
        expect(name).toBeInTheDocument();
        fireEvent.click(nextButton);
        return e;
      });
      const firstName = getByText(filteredPokemon[0].name);
      expect(firstName).toBeInTheDocument();
    }
    filter('All');
  });
});

describe(`Teste se é criado, dinamicamente, um botão de filtro para 
cada tipo de Pokémon.`, () => {
  it(`Deve existir um botão de filtragem para cada tipo de Pokémon 
  disponível nos dados, sem repetição. Ou seja, a sua Pokédex deve 
  possuir pokémons do tipo Fire, Psychic, Electric e Normal; + O 
  botão de Próximo pokémon deve ser desabilitado quando a lista 
  filtrada de Pokémons tiver um só pokémon.`, () => {
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    function isThere(type) {
      const filterButton = getByRole('button', { name: type });
      const allButton = getByRole('button', { name: 'All' });
      expect(filterButton).toBeInTheDocument();
      expect(allButton).not.toBeDisabled();
      const nextButton = getByText(/Próximo pokémon/);
      let filteredPokemon;
      fireEvent.click(filterButton);
      if (type !== 'All') {
        filteredPokemon = pokemons.filter((e) => e.type === type);
      } else filteredPokemon = pokemons;
      if (filteredPokemon.length === 1) expect(nextButton).toBeDisabled();
      else expect(nextButton).not.toBeDisabled();
    }
    isThere('All');
    isThere('Electric');
    isThere('Fire');
    isThere('Bug');
    isThere('Poison');
    isThere('Psychic');
    isThere('Normal');
    isThere('Dragon');
  });
});

it('Verifica a existência dos botões All, tipos e Next', () => {
  const { getAllByTestId, getByText } = renderWithRouter(
  // renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />,
  );
  const allFilters = getAllByTestId('pokemon-type-button');
  expect(allFilters.length).toBe(7);
  const allButton = getByText(/All/);
  expect(allButton).toBeInTheDocument();
  const nextButton = getByText(/Próximo pokémon/);
  expect(nextButton).toBeInTheDocument();
});
