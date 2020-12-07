import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test("is displayed on the screen 'No favorite pokemon'", () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const favoritePokemonsButton = getByText('Favorite Pokémons');
  fireEvent.click(favoritePokemonsButton);

  const noFavoriteText = getByText('No favorite pokemon found');
  expect(noFavoriteText).toBeInTheDocument();
});

test("is displayed on the screen all favorite pokemons card", () => {
  const { getByText, getByLabelText, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const moreDetailsButton = getByText('More details');
  fireEvent.click(moreDetailsButton)

  const checkFavorite =  getByLabelText('Pokémon favoritado?');
  fireEvent.click(checkFavorite);

  const favoritePokemonsButton = getByText('Favorite Pokémons');
  fireEvent.click(favoritePokemonsButton);

  const pokemonName = getByTestId('pokemon-name');
  const pokemonType = getByTestId('pokemonType');
  const pokemonWeight = getByTestId('pokemon-weight');

  expect(pokemonName).toHaveTextContent('Pikachu');
  expect(pokemonType).toHaveTextContent('Electric');
  expect(pokemonWeight).toHaveTextContent('6.0 kg');
});
