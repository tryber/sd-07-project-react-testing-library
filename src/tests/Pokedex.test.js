import React from 'react';
// import { render } from '@testing-library/react';
import { fireEvent, screen } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import pokemon from '../data';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

const maracutaia = {
  25: true,
};
describe('Testando a Pokedex', () => {
  test('A pagina contem um h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      isPokemonFavoriteById={ maracutaia }
      pokemons={ pokemon }
    />);
    const h2 = getByRole('heading', { name: /encountered pokémons/i });
    expect(h2.tagName).toBe('H2');
  });

  describe(`Exibe o próximo Pokémon da lista 
  quando o botão Próximo pokémon é clicado.`, () => {
    test('O botão deve conter o texto Próximo pokémon', () => {
      const { getByTestId } = renderWithRouter(<App />);
      const button = getByTestId('next-pokemon');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(/Próximo pokémon/i);
    });
    test('Pokémons da lista devem ser mostrados, um '
    + 'a um, ao clicar sucessivamente no botão', () => {
      const { getByTestId, getByText } = renderWithRouter(<App />);
      const button = getByTestId('next-pokemon');
      fireEvent.click(button);
      const pokemonName = getByText(/charmander/i);
      expect(pokemonName).toBeInTheDocument();
    });
    test('O primeiro Pokémon da lista deve ser mostrado ao clicar'
    + 'no botão, se estiver no último Pokémon da lista', () => {
      const { getByTestId, getByText } = renderWithRouter(<App />);
      const magicNumber = 8;
      const magicZero = 0;
      const button = getByTestId('next-pokemon');
      for (let index = magicZero; index < magicNumber; index += 1) {
        fireEvent.click(button);
      }
      const lastPokemon = getByText(/Dragonair/i);
      expect(lastPokemon).toBeInTheDocument();

      fireEvent.click(button);
      const firstPokemon = getByText(/pikachu/i);
      expect(firstPokemon).toBeInTheDocument();
    });
  });
  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const magicNumber = 8;
    const magicZero = 0;
    const button = getByTestId('next-pokemon');
    for (let index = magicZero; index < magicNumber; index += 1) {
      fireEvent.click(button);
      const pokemonName = getAllByTestId('pokemon-name');
      expect(pokemonName.length).toBe(1);
    }
  });
  describe('Teste se a Pokédex tem os botões de filtro.', () => {
    test('A partir da seleção de um botão de tipo, a '
    + 'Pokédex deve circular somente pelos pokémons daquele tipo', () => {
      const { getByTestId, getByRole } = renderWithRouter(<App />);
      const fireButton = getByRole('button', { name: /fire/i });
      fireEvent.click(fireButton);
      const magicNumber = 4;
      const magicZero = 0;
      for (let index = magicZero; index < magicNumber; index += 1) {
        const fireType = getByTestId('pokemonType');
        expect(fireType.firstChild.nodeValue).toBe('Fire');
        const nextButton = getByTestId('next-pokemon');
        fireEvent.click(nextButton);
      }
    });
    test('O texto do botão deve corresponder ao nome do tipo fire', () => {
      const { getByRole } = renderWithRouter(<App />);
      const fireButton = getByRole('button', { name: /fire/i });
      expect(fireButton.textContent).toBe('Fire');
    });
  });
  describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    test('O texto do botão deve ser All', () => {
      const { getByRole } = renderWithRouter(<App />);
      const fireButton = getByRole('button', { name: /all/i });
      expect(fireButton.textContent).toBe('All');
    });
    test('A Pokedéx deverá mostrar os Pokémons '
    + 'normalmente (sem filtros) quando o botão All for clicado', () => {
      const { getByRole, getByTestId } = renderWithRouter(<App />);
      const btnAll = getByRole('button', { name: /all/i });
      const btnNext = getByTestId('next-pokemon');
      const pokemonType = getByTestId('pokemonType');
      fireEvent.click(btnAll);
      expect(pokemonType.textContent).toBe('Electric');
      fireEvent.click(btnNext);
      expect(pokemonType.textContent).toBe('Fire');
      fireEvent.click(btnNext);
      expect(pokemonType.textContent).toBe('Bug');
      fireEvent.click(btnNext);
      expect(pokemonType.textContent).toBe('Poison');
    });
    test('Ao carregar a página, o filtro selecionado deverá ser All', () => {
      const { getByTestId } = renderWithRouter(<App />);
      const btnNext = getByTestId('next-pokemon');
      const pokemonType = getByTestId('pokemonType');
      expect(pokemonType.textContent).toBe('Electric');
      fireEvent.click(btnNext);
      expect(pokemonType.textContent).toBe('Fire');
      fireEvent.click(btnNext);
      expect(pokemonType.textContent).toBe('Bug');
      fireEvent.click(btnNext);
      expect(pokemonType.textContent).toBe('Poison');
    });
  });
  describe('Teste se é criado, dinamicamente, um botão '
  + 'de filtro para cada tipo de Pokémon', () => {
    test('Os botões de filtragem devem ser dinâmicos', () => {
      const { getAllByTestId } = renderWithRouter(<Pokedex
        isPokemonFavoriteById={ { 25: true } }
        pokemons={ pokemon }
      />);
      const btnType = [
        ...new Set(pokemon.reduce((types, { type }) => [...types, type], []))];
      const buttons = getAllByTestId('pokemon-type-button');
      expect(buttons.length).toBe(btnType.length);
    });
    test('Deve existir um botão de filtragem para cada tipo de Pokémon disponível nos'
    + ' dados, sem repetição. Ou seja, a sua Pokédex deve possuir pokémons do tipo '
    + 'Fire, Psychic, Electric e Normal', () => {
      const { getAllByTestId } = renderWithRouter(<Pokedex
        isPokemonFavoriteById={ { 25: true } }
        pokemons={ pokemon }
      />);
      const buttons = getAllByTestId('pokemon-type-button');
      const type = buttons.map((item) => item.firstChild.nodeValue);
      expect(type).toContain('Fire');
      expect(type).toContain('Psychic');
      expect(type).toContain('Electric');
      expect(type).toContain('Normal');
    });
    test('Deve ser mostrado como opção de filtro, um botão para cada um dos tipos. '
    + 'Além disso, o botão All precisa estar sempre visível.', () => {
      const { getByRole } = renderWithRouter(<Pokedex
        isPokemonFavoriteById={ maracutaia }
        pokemons={ pokemon }
      />);
      const allButton = getByRole('button', { name: /all/i });
      expect(allButton).toBeInTheDocument();
    });
  });
  test('O botão de Próximo pokémon deve ser desabilitado quando a lista filtrada '
  + 'de Pokémons tiver um só pokémon.', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ maracutaia }
      />,
    );
    const type = pokemon.map((item) => item.type);
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
