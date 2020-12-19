import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
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

  const title = getByText(`${card.name} Details`);
  const titleData = 'Charmander Details';
  expect(title.textContent).toBe(titleData);

  const linkDetails = screen.queryByRole(/More details/i);
  expect(linkDetails).not.toBeInTheDocument();

  const heading = getByText(/Summary/i);
  expect(heading).toBeInTheDocument();

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

  const title = getByText(`Game Locations of ${card.name}`);
  const titleData = 'Game Locations of Charmander';
  expect(title.textContent).toBe(titleData);

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

  const checkLabel = screen.getByRole('checkbox', { name: /Pokémon favoritado?/ });
  expect(checkLabel).toBeInTheDocument();

  const checkBox = screen.getByRole('checkbox');
  fireEvent.change(checkBox, { target: { checked: true } });
  expect(checkBox.checked).toEqual(true);

  fireEvent.change(checkBox, { target: { checked: false } });
  expect(checkBox.checked).toEqual(false);
});
