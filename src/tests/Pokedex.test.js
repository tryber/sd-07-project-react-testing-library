import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

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
  const { getByText, getAllByRole } = renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />,
  );
  const AllButton = getAllByRole('button', { name: 'All' });
  const ElectricButton = getAllByRole('button', { name: 'Electric',
    testIdAttribute: 'pokemon-type-button' });
  const FireButton = getAllByRole('button', { name: 'Fire',
    testIdAttribute: 'pokemon-type-button' });
  const BugButton = getAllByRole('button', { name: 'Bug',
    testIdAttribute: 'pokemon-type-button' });
  const PoisonButton = getAllByRole('button', { name: 'Poison',
    testIdAttribute: 'pokemon-type-button' });
  const PsychicButton = getAllByRole('button', { name: 'Psychic',
    testIdAttribute: 'pokemon-type-button' });
  const NormalButton = getAllByRole('button', { name: 'Normal',
    testIdAttribute: 'pokemon-type-button' });
  const DragonButton = getAllByRole('button', { name: 'Dragon',
    testIdAttribute: 'pokemon-type-button' });
  const NextButton = getAllByRole('button', { name: 'Próximo pokémon',
    testIdAttribute: 'pokemon-type-button' });

  const allButtons = getAllByRole('button');
  expect(AllButton[0]).toBeInTheDocument();
  expect(ElectricButton[0]).toBeInTheDocument();
  expect(FireButton[0]).toBeInTheDocument();
  expect(BugButton[0]).toBeInTheDocument();
  expect(PoisonButton[0]).toBeInTheDocument();
  expect(PsychicButton[0]).toBeInTheDocument();
  expect(NormalButton[0]).toBeInTheDocument();
  expect(DragonButton[0]).toBeInTheDocument();
  expect(NextButton[0]).toBeInTheDocument();

  expect(AllButton.length).toBe(1);
  expect(ElectricButton.length).toBe(1);
  expect(FireButton.length).toBe(1);
  expect(BugButton.length).toBe(1);
  expect(PoisonButton.length).toBe(1);
  expect(PsychicButton.length).toBe(1);
  expect(NormalButton.length).toBe(1);
  expect(DragonButton.length).toBe(1);
  expect(NextButton.length).toBe(1);

  expect(allButtons.length).toBe(9);

  const valueAllButton = getByText(/All/);

  expect(allButtons[0].innerHTML).toBe('All');
  expect(allButtons[1].innerHTML).toBe('Electric');
  expect(allButtons[2].innerHTML).toBe('Fire');
  expect(allButtons[3].innerHTML).toBe('Bug');
  expect(allButtons[4].innerHTML).toBe('Poison');
  expect(allButtons[5].innerHTML).toBe('Psychic');
  expect(allButtons[6].innerHTML).toBe('Normal');
  expect(allButtons[7].innerHTML).toBe('Dragon');
  expect(allButtons[8].innerHTML).toBe('Próximo pokémon');
});
