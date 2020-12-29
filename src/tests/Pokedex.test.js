import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import Pokedex from '../components/Pokedex';
import App from '../App';
import pokemons from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Testando o Header', () => {
  test('Teste se página contém um heading h2 com Encountered pokémons', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(h2.tagName).toBe('H2');
  });
});

describe('Teste se é exibido o próximo Pokémon da lista'
  + 'quando o botão Próximo pokémon é clicado.', () => {
  test('O botão deve conter o texto Próximo pokémon', () => {
    renderWithRouter(<App />);
    const btn = screen.getByTestId('next-pokemon');
    expect(btn).toBeInTheDocument();
    expect(btn.type).toBe('button');
    expect(btn).toHaveTextContent('Próximo pokémon');
  });

  test(`Os próximos Pokémons da lista devem ser mostrados, 
    um a um, ao clicar sucessivamente no botão`, () => {
    renderWithRouter(<App />);
    const btn = screen.getByTestId('next-pokemon');
    fireEvent.click(btn);
    const pokemonName = screen.getByText(/Charmander/i);
    expect(pokemonName).toBeInTheDocument();
  });

  it('O primeiro Pokémon da lista deve ser mostrado ao clicar '
    + 'no botão, se estiver no último Pokémon da lista', () => {
    renderWithRouter(<App />);
    const btn = screen.getByTestId('next-pokemon');
    const size = Object.keys(isPokemonFavoriteById).length;
    for (let count = 1; count < size; count += 1) {
      fireEvent.click(btn);
    }
    const pokemonName9 = screen.getByText(/Dragonair/i);
    expect(pokemonName9).toBeInTheDocument();

    fireEvent.click(btn);
    const pokemonName1 = screen.getByText(/Pikachu/i);
    expect(pokemonName1).toBeInTheDocument();
  });
});

describe('Teste da unicidade na tela dos cards', () => {
  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const btn = screen.getByTestId('next-pokemon');
    const size = Object.keys(isPokemonFavoriteById).length;
    for (let count = 1; count < size + 1; count += 1) {
      const name = screen.getAllByTestId('pokemon-name');
      fireEvent.click(btn);
      expect(name.length).toBe(1);
    }
  });
});

describe('Teste se a Pokédex tem os botões de filtro.', () => {
  it('A partir da seleção de um botão de tipo, a Pokédex deve '
  + 'circular somente pelos pokémons daquele tipo;', () => {
    renderWithRouter(<App />);
    const btnClick = screen.getByTestId('next-pokemon');
    const btnFire = screen.getByRole('button', { name: /Fire/i });
    fireEvent.click(btnFire);
    const n = 5;
    for (let index = 1; index < n; index += 1) {
      const pokemonType1 = screen.getByTestId('pokemonType');
      expect(pokemonType1.firstChild.nodeValue).toBe('Fire');
      fireEvent.click(btnClick);
    }
  });

  it('O texto do botão deve corresponder ao nome do tipo, '
  + 'ex. Psychic', () => {
    renderWithRouter(<App />);
    const btnFire = screen.getByRole('button', { name: /Fire/i });
    fireEvent.click(btnFire);
    expect(btnFire.textContent).toBe('Fire');
  });
});

describe('Teste se a Pokédex contém um botão para '
  + 'resetar o filtro', () => {
  it('O texto do botão deve ser All', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /All/i });
    expect(btnAll.textContent).toBe('All');
  });

  it('A Pokedéx deverá mostrar os Pokémons normalmente '
  + '(sem filtros) quando o botão All for clicado', () => {
    renderWithRouter(<App />);
    const btnClick = screen.getByTestId('next-pokemon');
    const btnAll = screen.getByRole('button', { name: /All/i });
    fireEvent.click(btnAll);
    const pokemonType1 = screen.getByTestId('pokemonType');
    expect(pokemonType1.textContent).toBe('Electric');
    fireEvent.click(btnClick);
    const pokemonType2 = screen.getByTestId('pokemonType');
    expect(pokemonType2.textContent).toBe('Fire');
    fireEvent.click(btnClick);
    const pokemonType3 = screen.getByTestId('pokemonType');
    expect(pokemonType3.textContent).toBe('Bug');
  });

  it('Ao carregar a página, o filtro selecionado '
  + 'deverá ser All;', () => {
    renderWithRouter(<App />);
    const btnClick = screen.getByTestId('next-pokemon');
    const pokemonType1 = screen.getByTestId('pokemonType');
    expect(pokemonType1.textContent).toBe('Electric');
    fireEvent.click(btnClick);
    const pokemonType2 = screen.getByTestId('pokemonType');
    expect(pokemonType2.textContent).toBe('Fire');
    fireEvent.click(btnClick);
    const pokemonType3 = screen.getByTestId('pokemonType');
    expect(pokemonType3.textContent).toBe('Bug');
  });
});

describe('Teste se é criado, dinamicamente, um botão de '
  + 'filtro para cada tipo de Pokémon.', () => {
  it('Os botões de filtragem devem ser dinâmicos', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const types2 = [
      ...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];

    expect(buttons.length).toBe(types2.length);
  });

  it('Deve existir um botão de filtragem para cada tipo de Pokémon '
  + 'disponível nos dados, sem repetição. Ou seja, a sua Pokédex deve '
  + 'possuir pokémons do tipo Fire, Psychic, Electric e Normal', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const buttons = screen.getAllByTestId('pokemon-type-button');

    const type = buttons.map((item) => item.firstChild.nodeValue);
    expect(type).toContain('Fire');
    expect(type).toContain('Psychic');
    expect(type).toContain('Electric');
    expect(type).toContain('Normal');
  });

  it('Deve ser mostrado como opção de filtro, um botão para cada um dos '
  + 'tipos. Além disso, o botão All precisa estar sempre visível.', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const btn = screen.getByRole('button', { name: /All/i });
    expect(btn).toBeInTheDocument();
  });
});

describe('Teste de botão desabilitado', () => {
  it('O botão de Próximo pokémon deve ser desabilitado quando a lista '
  + 'filtrada de Pokémons tiver um só pokémon', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const type = pokemons.map((item) => item.type);

    type.forEach((element) => {
      const filtered = type.filter((item) => item === element);
      if (filtered.length === 1) {
        const btn = screen.getByRole('button', { name: filtered[0] });
        fireEvent.click(btn);
        const btnGreen = screen.getByTestId('next-pokemon');
        expect(btnGreen.disabled).toBeTruthy();
      }
    });
  });
});
