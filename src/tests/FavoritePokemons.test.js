import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

test('Render mesage `No favorite pokemon found`', () => {
  const { getByText } = renderWithRouter(<App />);
  const favoritePokemon = getByText('Favorite Pokémons');
  fireEvent.click(favoritePokemon);
  const element = getByText('No favorite pokemon found');
  expect(element).toBeInTheDocument();
});

test('Render pokemons favorited', () => {
  const { queryByText, queryByLabelText, getByText } = renderWithRouter(<App />);
  const buttonDetails = queryByText('More details');
  fireEvent.click(buttonDetails);
  const checkbox = queryByLabelText('Pokémon favoritado?');
  fireEvent.click(checkbox);

  const home = queryByText('Home');
  fireEvent.click(home);
  const buttonNext = queryByText('Próximo pokémon');
  fireEvent.click(buttonNext);
  const buttonDetailsCharmander = queryByText('More details');
  fireEvent.click(buttonDetailsCharmander);
  const checkboxCharmander = queryByLabelText('Pokémon favoritado?');
  fireEvent.click(checkboxCharmander);

  const favoritePokemon = queryByText('Favorite Pokémons');
  fireEvent.click(favoritePokemon);
  const pikachu = queryByText('Pikachu');
  expect(pikachu).toBeInTheDocument();
  const charmander = getByText('Charmander');
  expect(charmander).toBeInTheDocument();
});

test('Not render pokemons not favorited', () => {
  const { getByText } = renderWithRouter(<App />);
  const pikachu = getByText('Pikachu');
  expect(pikachu).toBeInTheDocument();
  const favoritePokemon = getByText('Favorite Pokémons');
  fireEvent.click(favoritePokemon);
  expect(pikachu).not.toBeInTheDocument();
});
