import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

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
    });
  });

  describe('Teste se a Pokédex tem os botões de filtro', () => {
    test(`A partir da seleção de um botão de tipo, a Pokédex deve
    circular somente pelos pokémons daquele tipo`, () => {});
    test('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {});
  });

  describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    test('O texto do botão deve ser All', () => {});
    test(`A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros)
    quando o botão All for clicado`, () => {});
    test('Ao carregar a página, o filtro selecionado deverá ser All;', () => {});
  });

  describe(`Teste se é criado, dinamicamente, um botão de
  filtro para cada tipo de Pokémon.`, () => {
    test('Os botões de filtragem devem ser dinâmicos', () => {});
    test(`Deve existir um botão de filtragem para cada tipo de Pokémon
    disponível nos dados, sem repetição. Ou seja, a sua Pokédex deve possuir
    pokémons do tipo Fire, Psychic, Electric e Normal;`, () => {});
    test(`Deve ser mostrado como opção de filtro, um botão para cada um dos tipos.
    Além disso, o botão All precisa estar sempre visível.`, () => {});
  });

  test(`O botão de Próximo pokémon deve ser desabilitado
  quando a lista filtrada de Pokémons tiver um só pokémon.`, () => {});
});
