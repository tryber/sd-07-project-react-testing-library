import React from 'react';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import App from '../App';
import pokemons from '../data';

const POKEMON_TEST = pokemons[0];
const {
  id,
  name,
  type,
  averageWeight: {
    value,
    measurementUnit,
  },
  image,
} = POKEMON_TEST;

afterEach(cleanup);

it(`Teste se é renderizado um card com as 
    informações de determinado pokémon.`, () => {
  renderWithRouter(
    <Pokemon
      pokemon={ POKEMON_TEST }
      isFavorite={ App.setIsPokemonFavoriteById()[id] }
    />,
  );
  // O nome correto do Pokémon deve ser mostrado na tela;
  expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
  // O tipo correto do pokémon deve ser mostrado na tela.
  expect(screen.getByTestId('pokemonType')).toHaveTextContent(type);
  // O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida.
  expect(screen.getByTestId('pokemon-weight'))
    .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
  // A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon;
  expect(screen.getByAltText(`${name} sprite`).src)
    .toBe(image);
});

it(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação 
    para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, 
    onde <id> é o id do Pokémon exibido;`, () => {
  renderWithRouter(
    <Pokemon
      pokemon={ POKEMON_TEST }
      isFavorite={ App.setIsPokemonFavoriteById()[id] }
    />,
  );
  expect(screen.getByText('More details')).toHaveAttribute('href', `/pokemons/${id}`);
});

it(`Teste se ao clicar no link de navegação do Pokémon,
    é feito o redirecionamento da aplicação para a página
    de detalhes de Pokémon.`, async () => {
  const { history } = renderWithRouter(
    <Pokemon
      pokemon={ POKEMON_TEST }
      isFavorite={ App.setIsPokemonFavoriteById()[id] }
    />,
  );
  fireEvent.click(screen.getByRole('link', { href: `/pokemons/${id}` }));
  const { location: { pathname } } = history;
  expect(pathname).toBe(`/pokemons/${id}`);
});

it(`Teste também se a URL exibida no navegador muda para /pokemon/<id>, 
    onde <id> é o id do Pokémon cujos detalhes se deseja ver;`, () => {
  const { history } = renderWithRouter(
    <Pokemon
      pokemon={ POKEMON_TEST }
      isFavorite={ App.setIsPokemonFavoriteById()[id] }
    />,
  );
  fireEvent.click(screen.getByRole('link', { href: `/pokemons/${id}` }));
  const { location: { pathname } } = history;
  expect(pathname).toBe(`/pokemons/${id}`);
});

it(`Teste se existe um ícone de estrela 
    nos Pokémons favoritados.`, () => {
  const IS_FAVORITE = true;
  renderWithRouter(
    <Pokemon
      pokemon={ POKEMON_TEST }
      isFavorite={ IS_FAVORITE }
    />,
  );
  // O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg;
  // A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde <pokemon> é o nome do Pokémon exibido.
  expect(screen.getByAltText(`${name} is marked as favorite`).src)
    .toContain('/star-icon.svg');
});
