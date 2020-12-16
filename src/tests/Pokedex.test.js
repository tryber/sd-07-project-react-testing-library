import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokedex from '../components/Pokedex';

import pokemons from '../data';

describe('5 - Testando o arquivo Pokedex.js', () => {
  test(`5.1 - Teste se página contém um heading h2
  com o texto Encountered pokémons`, () => {
    const { getByText } = renderWithRouter(<App />);
    const h2 = getByText(/Encountered pokémons/i);
    expect(h2).toBeInTheDocument();
  });

  test(`5.2.1 - Teste se é exibido o próximo Pokémon da lista quando
  o botão Próximo pokémon é clicado:
  O botão deve conter o texto Próximo pokémon`, () => {
    const { getByTestId } = renderWithRouter(<App />);
    const buttonProximo = getByTestId('next-pokemon');
    expect(buttonProximo).toBeInTheDocument();
    expect(buttonProximo).toHaveTextContent(/Próximo pokémon/i);
  });

  test(`5.2.2 - Teste se é exibido o próximo Pokémon da lista quando
  o botão Próximo pokémon é clicado: Os próximos Pokémons da lista devem ser
  mostrados, um a um, ao clicar sucessivamente no botão`, () => {
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
  test(`5.2.3 - Teste se é exibido o próximo Pokémon da lista quando
    o botão Próximo pokémon é clicado: O primeiro Pokémon da lista deve ser
    mostrado ao clicar no botão, se estiver no último Pokémon da lista;`, () => {
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

  test('5.3 - Teste se é mostrado apenas um Pokémon por vez.', () => {
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

  test(`5.4.1 - Teste se a Pokédex tem os botões de filtro. A partir da seleção
  de um botão de tipo, a Pokédex deve circular somente
  pelos pokémons daquele tipo`, () => {
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
  test(`5.4.2 - Teste se a Pokédex tem os botões de filtro.
  O texto do botão deve corresponder ao nome do tipo, ex. Psychic`, () => {
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

  test(`5.5.1 - Teste se a Pokédex contém um botão para resetar o filtro.
  O texto do botão deve ser All`, () => {
    jest.spyOn(Pokedex.prototype, 'filterPokemons');
    const { getAllByRole } = renderWithRouter(<App />);
    const buttonAll = getAllByRole('button');
    expect(buttonAll[0]).toHaveTextContent('All');
    fireEvent.click(buttonAll[0]);
    expect(Pokedex.prototype.filterPokemons).toHaveBeenCalled();
  });
  test(`5.5.2 - Teste se a Pokédex contém um botão para resetar o filtro.
  A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros)
  quando o botão All for clicado`, () => {
    const { getByTestId, getByText, getAllByRole } = renderWithRouter(<App />);
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
    const buttonAll = getAllByRole('button');
    fireEvent.click(buttonAll[0]);
    pokemons.forEach((pokemon) => {
      expect(name).toHaveTextContent(pokemon.name);
      expect(type).toHaveTextContent(pokemon.type);
      expect(weight).toHaveTextContent(
        `${pokemon.averageWeight.value} ${pokemon.averageWeight.measurementUnit}`,
      );
      fireEvent.click(buttonProximo);
    });
  });
  test(`5.5.3 - Teste se a Pokédex contém um botão para resetar o filtro.
  Ao carregar a página, o filtro selecionado deverá ser All`, () => {
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
  test(`5.6.1 - Teste se é criado, dinamicamente, um botão de filtro para cada
  tipo de Pokémon. Os botões de filtragem devem ser dinâmicos`, () => {
    const arrayTypes = [
      ...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];

    const { getAllByTestId } = renderWithRouter(<App />);
    const buttonFilter = getAllByTestId('pokemon-type-button');
    expect(buttonFilter).toHaveLength(arrayTypes.length);
  });
  test(`5.6.2 - Teste se é criado, dinamicamente, um botão de filtro para cada
  tipo de Pokémon. Deve existir um botão de filtragem para cada tipo de Pokémon
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
  test(`5.6.3 - Teste se é criado, dinamicamente, um botão de filtro para cada
  tipo de Pokémon. Deve ser mostrado como opção de filtro, um botão para cada
  um dos tipos. Além disso, o botão All precisa estar sempre visível.`, () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const buttonFilter = getAllByRole('button');
    expect(buttonFilter[0]).toHaveTextContent('All');
    expect(buttonFilter[1]).toHaveTextContent('Electric');
    expect(buttonFilter[2]).toHaveTextContent('Fire');
    expect(buttonFilter[3]).toHaveTextContent('Bug');
    expect(buttonFilter[4]).toHaveTextContent('Poison');
    expect(buttonFilter[5]).toHaveTextContent('Psychic');
    expect(buttonFilter[6]).toHaveTextContent('Normal');
    expect(buttonFilter[7]).toHaveTextContent('Dragon');
  });

  test(`5.7 - O botão de Próximo pokémon deve ser desabilitado
  quando a lista filtrada de Pokémons tiver um só pokémon.`, () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const buttonFilter = getAllByTestId('pokemon-type-button');
    const buttonProximo = getByTestId('next-pokemon');
    fireEvent.click(buttonFilter[0]);
    expect(buttonProximo).toBeDisabled();
  });
});
