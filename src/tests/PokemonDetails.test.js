import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import { PokemonDetails } from '../components';
import App from '../App';
import pokemons from '../data';

const POKEMON_TEST = pokemons[0];
const {
  id,
  name,
  summary,
  foundAt,
} = POKEMON_TEST;

afterEach(cleanup);

it(`Teste se as informações detalhadas do 
    Pokémon selecionado são mostradas na tela.`, () => {
  renderWithRouter(
    <PokemonDetails
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      match={ { params: { id: POKEMON_TEST.id.toString() } } }
      onUpdateFavoritePokemons={ () => {} }
      pokemons={ pokemons }
    />,
  );
  // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;
  expect(screen.getByText(`${name} Details`)).toBeInTheDocument();
  // Não deve existir o link de navegação para os detalhes do Pokémon selecionado.
  expect(screen.queryByRole('link', { href: `/pokemons/${id}` })).toBeNull();
  // A seção de detalhes deve conter um heading h2 com o texto Summary.
  expect(screen.getByRole('heading', { name: 'Summary' })).toBeInTheDocument();
  // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
  expect(screen.getByText(summary)).toBeInTheDocument();
});

it(`Teste se existe na página uma seção com os 
  mapas contendo as localizações do pokémon`, () => {
  renderWithRouter(
    <PokemonDetails
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      match={ { params: { id: POKEMON_TEST.id.toString() } } }
      onUpdateFavoritePokemons={ () => {} }
      pokemons={ pokemons }
    />,
  );
  // Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido.
  expect(screen.getByRole('heading', { name: `Game Locations of ${name}` }))
    .toBeInTheDocument();
  // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;
  // A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon;
  expect(screen.queryAllByAltText(`${name} location`).length)
    .toBe(foundAt.length);
  // Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;
  // A imagem da localização deve ter um atributo src com a URL da localização;
  foundAt.forEach(
    ({ location, map }, index) => {
      expect(screen.getByText(location)).toBeInTheDocument();
      expect(screen.queryAllByRole('img', { src: map })[index + 1].src)
        .toBe(map);
    },
  );
});

it(`Teste se o usuário pode favoritar um 
  pokémon através da página de detalhes.`, () => {
  const { history } = renderWithRouter(<App />);
  history.push(`/pokemons/${id}`);
  // A página deve exibir um checkbox que permite favoritar o Pokémon;
  expect(screen.getByText(/pokémon favoritado?/i)).toBeInTheDocument();
  // Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;
  fireEvent.click(screen.getByText(/pokémon favoritado?/i));
  expect(screen.getByRole('img', { name: `${name} is marked as favorite` }))
    .toBeInTheDocument();
  fireEvent.click(screen.getByText(/pokémon favoritado?/i));
  expect(screen.queryByRole('img', { name: `${name} is marked as favorite` }))
    .toBeNull();
  // O label do checkbox deve conter o texto Pokémon favoritado?;
  expect(screen.getByLabelText(/Pokémon favoritado?/i))
    .toBeInTheDocument();
});
