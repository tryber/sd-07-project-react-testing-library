import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('should have a link with the text: More Details', () => {
  const { getByRole } = renderWithRouter(<App />);

  const moreDetailsLink = getByRole('link', { name: /More details/ });
  const link = moreDetailsLink.href.includes('/pokemons/');

  expect(moreDetailsLink).toBeInTheDocument();
  expect(link).toBe(true);
});

it('the link should direct to the More Details page', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  const moreDetailsLink = getByRole('link', { name: /More details/ });
  const [, id] = moreDetailsLink.href.split('/pokemons/');

  fireEvent.click(moreDetailsLink);

  const moreDetailsPage = history.location.pathname;

  expect(moreDetailsPage).toBe(`/pokemons/${id}`);
});

it('should display a card containing basic pokemon infos', () => {
  const { getByTestId } = renderWithRouter(<App />);

  const pokemonName = getByTestId('pokemon-name');
  const pokemonType = getByTestId('pokemonType');
  const pokemonWeight = getByTestId('pokemon-weight');
  const pokemonWeightLength = 4;

  expect(pokemonName).toBeInTheDocument();
  expect(pokemonType).toBeInTheDocument();
  expect(pokemonWeight).toBeInTheDocument();

  expect(pokemonName.textContent).not.toBe('');
  expect(pokemonType.textContent).not.toBe('');
  expect(pokemonWeight.textContent).not.toBe('');

  expect(pokemonWeight.textContent).not.toBe('Average weight:  ');
  expect(pokemonWeight.textContent).not.toBe('Average weight:  kg');
  expect(pokemonWeight.textContent.split(' ').length).toBe(pokemonWeightLength);
});

it('should present the average following: <measure> kg', () => {
  const { getByText } = renderWithRouter(<App />);

  const numberWeightInfo = getByText(/Average weight:/);
  const unitWeightInfo = getByText(/kg/);

  expect(numberWeightInfo).toBeInTheDocument();
  expect(unitWeightInfo).toBeInTheDocument();
  expect(unitWeightInfo).not.toBe('');
});

it('should display a correct type info', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const types = ['Electric',
    'Fire',
    'Bug',
    'Poison',
    'Psychic',
    'Normal',
    'Dragon'];

  const pokemonType = getByTestId('pokemonType');

  const inTypes = types.includes(pokemonType.textContent);

  expect(inTypes).toBe(inTypes);
  expect(pokemonType.textContent).not.toBe('');
});

it('should have an image with alt being: nameOfPokemon sprite', () => {
  const { getAllByRole, getByTestId } = renderWithRouter(<App />);

  const imagePokemon = getAllByRole('img');
  const pokemonName = getByTestId('pokemon-name');
  const altPokemon = `${pokemonName.textContent} sprite`;

  expect(imagePokemon[0].src).not.toBeNull();
  expect(imagePokemon[0].src).not.toBe('');
  expect(imagePokemon[0].alt).toBe(altPokemon);
});

it('should have an image showing that the Pokemon is a favorite one', () => {
  const { getByText, getByTestId, getAllByRole } = renderWithRouter(<App />);

  fireEvent.click(getByText(/More details/));
  fireEvent.click(getByText(/Pokémon favoritado?/));
  fireEvent.click(getByText(/Home/));

  const pokemonName = getByTestId('pokemon-name');
  const altPokemon = `${pokemonName.textContent} is marked as favorite`;
  const imagePokemon = getAllByRole('img');

  expect(imagePokemon[1].src).not.toBeNull();
  expect(imagePokemon[1].src).not.toBe('');
  expect(imagePokemon[1].alt).toBe(altPokemon);
});
