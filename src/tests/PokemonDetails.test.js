import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
// import App from '../App';
import pokemons from '../data';

test('Informações detalhadas do Pokémon selecionado', () => {
  const card = pokemons[1];
  const { getByText, history } = renderWithRouter(
    <PokemonDetails
      isPokemonFavoriteById={ { 4: false } }
      match={ { params: { id: '4' } } }
      onUpdateFavoritePokemons={ () => {} }
      pokemons={ pokemons }
    />,
  );

  // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon
  const title = getByText(`${card.name} Details`);
  const titleData = 'Charmander Details';
  expect(title.textContent).toBe(titleData);

  // Não deve existir o link de navegação para os detalhes do Pokémon selecionado
  const linkDetails = screen.queryByRole(/More details/i);
  expect(linkDetails).not.toBeInTheDocument();

  // A seção de detalhes deve conter um heading h2 com o texto Summary
  const heading = getByText(/Summary/i);
  expect(heading).toBeInTheDocument();

  // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon
  history.push('/pokemons/4');
  expect(getByText(/the flame on its tail shows/i)).toBeInTheDocument();
});

test('Teste se existe uma seção com os mapas contendo as localizações do pokémon', () => {
  const card = pokemons[1];
  const { getByText, getAllByRole } = renderWithRouter(
    <PokemonDetails
      isPokemonFavoriteById={ { 4: false } }
      match={ { params: { id: '4' } } }
      onUpdateFavoritePokemons={ () => {} }
      pokemons={ pokemons }
    />,
  );

  // Deverá existir um heading h2 com o texto Game Locations of <name>,
  // onde <name> é o nome do Pokémon
  const title = getByText(`Game Locations of ${card.name}`);
  const titleData = 'Game Locations of Charmander';
  expect(title.textContent).toBe(titleData);

  // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes
  // Isabela Rosa:
  // https://github.com/tryber/sd-06-project-react-testing-library/pull/131/files
  const image = getAllByRole('img', { name: `${card.name} location` });
  card.foundAt.forEach((local, indexLocal) => {
    const imageLocal = image[indexLocal];
    expect(imageLocal).toBeInTheDocument();

    const nameLocal = getByText(local.location);
    expect(nameLocal).toBeInTheDocument();

    const srcImageLocal = local.map;
    expect(imageLocal).toHaveAttribute('src', srcImageLocal);
  });
});

test('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
  renderWithRouter(
    <PokemonDetails
      isPokemonFavoriteById={ { 4: false } }
      match={ { params: { id: '4' } } }
      onUpdateFavoritePokemons={ () => {} }
      pokemons={ pokemons }
    />,
  );

  // A página deve exibir um checkbox que permite favoritar o Pokémon
  const checkLabel = screen.getByRole('checkbox', { name: /Pokémon favoritado?/ });
  expect(checkLabel).toBeInTheDocument();

  // Cliques alternados no checkbox devem adicionar e remover da lista de favoritos
  const checkBox = screen.getByRole('checkbox');
  fireEvent.change(checkBox, { target: { checked: true } });
  expect(checkBox.checked).toEqual(true);

  fireEvent.change(checkBox, { target: { checked: false } });
  expect(checkBox.checked).toEqual(false);
});
