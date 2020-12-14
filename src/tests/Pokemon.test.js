import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('6. Testando o arquivo Pokemon.js', () => {
  describe(`Teste se é renderizado um card com as informações
  de determinado pokémon`, () => {
    const { getByTestId } = renderWithRouter(<App />);
    test('O nome correto do Pokémon deve ser mostrado na tela', () => {
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
    test('O tipo correto do pokémon deve ser mostrado na tela', () => {});
    test(`O peso médio do pokémon deve ser exibido com um texto
    no formato Average weight: <value> <measurementUnit>;
    onde <value> e <measurementUnit> são, respectivamente, o peso
    médio do pokémon e sua unidade de medida.`, () => {});
    test(`A imagem do Pokémon deve ser exibida. Ela deve conter um
    atributo src com a URL da imagem e um atributo alt com o texto
    <name> sprite, onde <name> é o nome do pokémon`, () => {});
  });
  test(`Teste se o card do Pokémon indicado na Pokédex contém um link
  de navegação para exibir detalhes deste Pokémon. O link deve possuir
  a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido`, () => {});
  test(`Teste se ao clicar no link de navegação do Pokémon, é feito o
  redirecionamento da aplicação para a página de detalhes de Pokémon`, () => {});
  test(`Teste também se a URL exibida no navegador muda para /pokemon/<id>,
  onde <id> é o id do Pokémon cujos detalhes se deseja ver`, () => {});

  describe('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    test(`O ícone deve ser uma imagem com o atributo src contendo o caminho
    /star-icon.svg`, () => {});
    test(`A imagem deve ter o atributo alt igual a <pokemon> is marked as
    favorite, onde <pokemon> é o nome do Pokémon exibido`, () => {});
  });
});
