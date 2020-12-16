import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokedex from '../components/Pokedex';

import pokemons from '../data';

describe('5 - Testando o arquivo Pokedex.js', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const h2 = getByText(/Encountered pokémons/i);
    expect(h2).toBeInTheDocument();
  });

  describe(`Teste se é exibido o próximo Pokémon da lista
  quando o botão Próximo pokémon é clicado.`, () => {
    test('O botão deve conter o texto Próximo pokémon', () => {
      const { getByTestId } = renderWithRouter(<App />);
      const buttonProximo = getByTestId('next-pokemon');
      expect(buttonProximo).toBeInTheDocument();
      expect(buttonProximo).toHaveTextContent(/Próximo pokémon/i);
    });

    test(`Os próximos Pokémons da lista devem ser mostrados, um a um,
    ao clicar sucessivamente no botão`, () => {
      const { getByTestId } = renderWithRouter(<App />);
      const buttonProximo = getByTestId('next-pokemon');
      const name = getByTestId('pokemon-name');
      const type = getByTestId('pokemonType');
      const weight = getByTestId('pokemon-weight');

      pokemons.forEach((pokemon) => {
        expect(name).toHaveTextContent(pokemon.name);
        expect(type).toHaveTextContent(pokemon.type);
        expect(weight).toHaveTextContent(
          `${pokemon.averageWeight.value} ${pokemon.averageWeight.measurementUnit}`,
        );
        fireEvent.click(buttonProximo);
      });
    });

    test(`O primeiro Pokémon da lista deve ser mostrado ao clicar no botão,
    se estiver no último Pokémon da lista;`, () => {
      const { getByTestId } = renderWithRouter(<App />);
      const buttonProximo = getByTestId('next-pokemon');
      const name = getByTestId('pokemon-name');
      const type = getByTestId('pokemonType');
      const weight = getByTestId('pokemon-weight');
      pokemons.forEach((pokemon, index) => {
        fireEvent.click(buttonProximo);
        if (index === pokemons.length) {
          expect(name).toHaveTextContent(pokemon.name);
          expect(type).toHaveTextContent(pokemon.type);
          expect(weight).toHaveTextContent(
            `${pokemon.averageWeight.value} ${pokemon.averageWeight.measurementUnit}`,
          );
        }
      });
    });
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const buttonProximo = getAllByTestId('next-pokemon');
    const name = getAllByTestId('pokemon-name');
    const type = getAllByTestId('pokemonType');
    const weight = getAllByTestId('pokemon-weight');

    pokemons.forEach((pokemon) => {
      expect(name).toHaveLength(1);
      expect(type).toHaveLength(1);
      expect(weight).toHaveLength(1);
      fireEvent.click(buttonProximo[0]);
      console.log(pokemon.name);
    });
  });

  describe('Teste se a Pokédex tem os botões de filtro', () => {
    test(`A partir da seleção de um botão de tipo, a Pokédex deve
    circular somente pelos pokémons daquele tipo`, () => {
      const arrayTypes = [
        ...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];
      const { getAllByTestId, getByTestId, getByText } = renderWithRouter(<App />);
      const buttonFilter = getAllByTestId('pokemon-type-button');
      const buttonNext = getByTestId('next-pokemon');
      const buttonType = getByText('Fire');
      const type = getByTestId('pokemonType');
      expect(buttonFilter).toHaveLength(arrayTypes.length);
      fireEvent.click(buttonType);
      expect(type).toHaveTextContent('Fire');
      fireEvent.click(buttonNext);
      expect(type).toHaveTextContent('Fire');
      fireEvent.click(buttonNext);
      expect(type).toHaveTextContent('Fire');
    });
    test('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
      const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
      const buttonFilter = getAllByTestId('pokemon-type-button');
      fireEvent.click(buttonFilter[0]);
      const type = getByTestId('pokemonType');
      expect(type).toHaveTextContent('Electric');
      fireEvent.click(buttonFilter[1]);
      expect(type).toHaveTextContent('Fire');
      fireEvent.click(buttonFilter[2]);
      expect(type).toHaveTextContent('Bug');
      fireEvent.click(buttonFilter[3]);
      expect(type).toHaveTextContent('Poison');
      fireEvent.click(buttonFilter[4]);
      expect(type).toHaveTextContent('Psychic');
      fireEvent.click(buttonFilter[5]);
      expect(type).toHaveTextContent('Normal');
      fireEvent.click(buttonFilter[6]);
      expect(type).toHaveTextContent('Dragon');
    });
  });

  describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    test('O texto do botão deve ser All', () => {
/*       jest.spyOn(Pokedex.prototype, 'filterPokemons');
      const { getByTestId } = renderWithRouter(<App />);
      const buttonAll = getByTestId('all');
      expect(buttonAll).toHaveTextContent('All');
      fireEvent.click(buttonAll);
      expect(Pokedex.prototype.filterPokemons).toHaveBeenCalled(); */
    });
    test(`A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros)
    quando o botão All for clicado`, () => {
      const { getByTestId, getByText } = renderWithRouter(<App />);
      const buttonProximo = getByTestId('next-pokemon');
      const name = getByTestId('pokemon-name');
      const type = getByTestId('pokemonType');
      const weight = getByTestId('pokemon-weight');
      const buttonType = getByText('Fire');
      fireEvent.click(buttonType);
      expect(type).toHaveTextContent('Fire');
      fireEvent.click(buttonType);
      expect(type).toHaveTextContent('Fire');
      fireEvent.click(buttonType);
      expect(type).toHaveTextContent('Fire');

      const buttonAll = getByTestId('all');
      fireEvent.click(buttonAll);

      pokemons.forEach((pokemon) => {
        expect(name).toHaveTextContent(pokemon.name);
        expect(type).toHaveTextContent(pokemon.type);
        expect(weight).toHaveTextContent(
          `${pokemon.averageWeight.value} ${pokemon.averageWeight.measurementUnit}`,
        );
        fireEvent.click(buttonProximo);
      });
    });
    test('Ao carregar a página, o filtro selecionado deverá ser All;', () => {
      const { getByTestId } = renderWithRouter(<App />);
      const buttonProximo = getByTestId('next-pokemon');
      const name = getByTestId('pokemon-name');
      const type = getByTestId('pokemonType');
      const weight = getByTestId('pokemon-weight');

      pokemons.forEach((pokemon) => {
        expect(name).toHaveTextContent(pokemon.name);
        expect(type).toHaveTextContent(pokemon.type);
        expect(weight).toHaveTextContent(
          `${pokemon.averageWeight.value} ${pokemon.averageWeight.measurementUnit}`,
        );
        fireEvent.click(buttonProximo);
      });
    });
  });

  describe(`Teste se é criado, dinamicamente, um botão de
  filtro para cada tipo de Pokémon.`, () => {
    const arrayTypes = [
      ...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];
    test('Os botões de filtragem devem ser dinâmicos', () => {
      const { getAllByTestId } = renderWithRouter(<App />);
      const buttonFilter = getAllByTestId('pokemon-type-button');
      expect(buttonFilter).toHaveLength(arrayTypes.length);
    });
    test(`Deve existir um botão de filtragem para cada tipo de Pokémon
    disponível nos dados, sem repetição. Ou seja, a sua Pokédex deve possuir
    pokémons do tipo Fire, Psychic, Electric e Normal;`, () => {
      const { getAllByTestId } = renderWithRouter(<App />);
      const buttonFilter = getAllByTestId('pokemon-type-button');
      expect(buttonFilter[0]).toHaveTextContent('Electric');
      expect(buttonFilter[1]).toHaveTextContent('Fire');
      expect(buttonFilter[2]).toHaveTextContent('Bug');
      expect(buttonFilter[3]).toHaveTextContent('Poison');
      expect(buttonFilter[4]).toHaveTextContent('Psychic');
      expect(buttonFilter[5]).toHaveTextContent('Normal');
      expect(buttonFilter[6]).toHaveTextContent('Dragon');
    });
    test(`Deve ser mostrado como opção de filtro, um botão para cada um dos tipos.
    Além disso, o botão All precisa estar sempre visível.`, () => {
      const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
      const buttonFilter = getAllByTestId('pokemon-type-button');
      const buttonAll = getByTestId('all');
      expect(buttonAll).toHaveTextContent('All');
      expect(buttonFilter[0]).toHaveTextContent('Electric');
      expect(buttonFilter[1]).toHaveTextContent('Fire');
      expect(buttonFilter[2]).toHaveTextContent('Bug');
      expect(buttonFilter[3]).toHaveTextContent('Poison');
      expect(buttonFilter[4]).toHaveTextContent('Psychic');
      expect(buttonFilter[5]).toHaveTextContent('Normal');
      expect(buttonFilter[6]).toHaveTextContent('Dragon');
    });
  });

  test(`O botão de Próximo pokémon deve ser desabilitado
  quando a lista filtrada de Pokémons tiver um só pokémon.`, () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const buttonFilter = getAllByTestId('pokemon-type-button');
    const buttonProximo = getByTestId('next-pokemon');
    fireEvent.click(buttonFilter[0]);
    expect(buttonProximo).toBeDisabled();
  });
});
