import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

test('O nome correto do Pokémon deve ser mostrado na tela', () => {
  renderWithRouter(
    <Pokemon pokemon={ pokemons[0] } isFavorite={ isPokemonFavoriteById[25] } />,
  );
  const pika = screen.getByTestId('pokemon-name');
  expect(pika.textContent).toBe('Pikachu');
});

test('O tipo correto do pokémon deve ser mostrado na tela', () => {
  renderWithRouter(
    <Pokemon pokemon={ pokemons[0] } isFavorite={ isPokemonFavoriteById[25] } />,
  );
  const electric = screen.getByTestId('pokemonType');
  expect(electric.textContent).toBe('Electric');
});

test('se é exibido com um texto no formato Average weight', () => {
  renderWithRouter(
    <Pokemon pokemon={ pokemons[0] } isFavorite={ isPokemonFavoriteById[25] } />,
  );
  const weigth = screen.getByTestId('pokemon-weight').innerHTML;
  expect(weigth).toBe('Average weight: 6.0 kg');
});

test('A imagem do Pokémon deve ser exibida', () => {
  renderWithRouter(
    <Pokemon pokemon={ pokemons[0] } isFavorite={ isPokemonFavoriteById[25] } />,
  );
  const img = screen.getByAltText(`${pokemons[0].name} sprite`);
  expect(img.src).toBe(
    'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  );
  expect(img.alt).toBe('Pikachu sprite');
});

test('se contém um link de navegação para exibir detalhes', () => {
  renderWithRouter(
    <Pokemon pokemon={ pokemons[0] } isFavorite={ isPokemonFavoriteById[25] } />,
  );
  const link = screen.getByText('More details');
  expect(link.tagName).toBe('A');
});

test('é feito o redirecionamento da aplicação para a página de detalhes', () => {
  const { history, getByText } = renderWithRouter(
    <Pokemon pokemon={ pokemons[0] } isFavorite={ isPokemonFavoriteById[25] } />,
  );
  const link = getByText('More details');
  fireEvent.click(link);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

test('se no navegador muda para /pokemon/<id>', () => {
  renderWithRouter(
    <Pokemon pokemon={ pokemons[0] } isFavorite={ isPokemonFavoriteById[25] } />,
  );
  const link = screen.getByText('More details');
  expect(link.href).toBe('http://localhost/pokemons/25');
});

test('src deve conter o caminho /star-icon.svg', () => {
  renderWithRouter(
    <Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ isPokemonFavoriteById[25] }
    />,
  );
  const img = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
  expect(img.src).toBe('http://localhost/star-icon.svg');
});

test('A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite', () => {
  renderWithRouter(
    <Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ isPokemonFavoriteById[25] }
    />,
  );
  const img = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
  expect(img.alt).toBe('Pikachu is marked as favorite');
});
