import React from 'react';
// import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

const {
  averageWeight: { value, measurementUnit },
  name,
  image,
  id,
} = pokemons[0];

test('É renderizado um card com as informações de determinado pokémon', () => {
  const { getByTestId, getByAltText } = renderWithRouter(<App />);

  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName.innerHTML).toBe('Pikachu');

  const pokemonType = getByTestId('pokemonType');
  expect(pokemonType.innerHTML).toBe('Electric');

  const pokemonWeight = getByTestId('pokemon-weight');
  expect(pokemonWeight.innerHTML).toBe(
    `Average weight: ${value} ${measurementUnit}`,
  );

  const pokemonImg = getByAltText('Pikachu sprite');
  expect(pokemonImg).toBeInTheDocument();
  expect(pokemonImg.alt).toBe(`${name} sprite`);
  expect(pokemonImg.src).toBe(`${image}`);
});

test('Pokémon na Pokédex contém um link de navegação para exibir detalhes', () => {
  const { getByText } = renderWithRouter(<App />);

  const pokemonLink = getByText('More details');
  expect(pokemonLink.href).toBe(`http://localhost/pokemons/${id}`);
});

test('Ao clicar no link de detalhes, é  redirecionado para a página do Pokémon', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const pokemonLink = getByText('More details');
  fireEvent.click(pokemonLink);
  const { pathname } = history.location;
  expect(pathname).toBe(`/pokemons/${id}`);
  const locationText = getByText('Game Locations of Pikachu');
  expect(locationText).toBeInTheDocument();
});

test('Existe um ícone de estrela nos Pokémons favoritados.', () => {
  const { getByAltText, getByText } = renderWithRouter(<App />);
  const pokemonLink = getByText('More details');

  fireEvent.click(pokemonLink);

  const favoritePokemon = getByText('Pokémon favoritado?');

  userEvent.click(favoritePokemon);

  const starIcon = getByAltText(`${name} is marked as favorite`);
  expect(starIcon).toBeInTheDocument();
  expect(starIcon.src).toBe('http://localhost/star-icon.svg');
});
