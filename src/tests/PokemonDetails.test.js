import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

describe('7 - Testando o arquivo PokemonDetails.js', () => {
  test(`7.1 - A página deve conter um texto <name> Details,
    onde <name> é o nome do Pokémon`, () => {
    const { getByRole } = renderWithRouter(<PokemonDetails match={ pokemons[0] } />);
    const h2 = getByRole('h2');
    expect(h2).toBeInDocument();
  });

  test(`7.2 - Não deve existir o link de navegação para os detalhes
   do Pokémon selecionado.`, () => {});

  test(`7.3 - A seção de detalhes deve conter
  um heading h2 com o texto Summary.`, () => {});

  test(`7.4 - A seção de detalhes deve conter um parágrafo com o resumo do
  Pokémon específico sendo visualizado.`, () => {});

  test(`7.5 - Na seção de detalhes deverá existir um heading h2 com o texto Game
  Locations of <name>; onde <name> é o nome do Pokémon exibido.`, () => {});

  test(`7.6 - Todas as localizações do Pokémon devem ser mostradas na seção
  de detalhes`, () => {});

  test(`7.7 - Todas as localizações do Pokémon devem ser mostradas
   na seção de detalhes`, () => {});

  test(`7.8 - Devem ser exibidos, o nome da localização e uma imagem
   do mapa em cada localização`, () => {});

  test(`7.9 - A imagem da localização deve ter um atributo src
   com a URL da localização`, () => {});

  test(`7.10 - A imagem da localização deve ter um atributo alt com o texto <name>
  location, onde <name> é o nome do Pokémon`, () => {});

  test(`7.11 - A página deve exibir um checkbox
  que permite favoritar o Pokémon`, () => {});

  test(`7.12 - Cliques alternados no checkbox devem adicionar e remover respectivamente
  o Pokémon da lista de favoritos`, () => {});
  test('7.13 - O label do checkbox deve conter o texto Pokémon favoritado?', () => {});
});
