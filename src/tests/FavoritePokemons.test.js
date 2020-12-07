import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import pokemons from '../data';

test('if there is no favorite pokemon', () => {
  renderWithRouter(<App />);
  const favoriteLink = screen.getByText(/favorite pokémon/i);

  fireEvent.click(favoriteLink);
  const noFavoriteText = screen.getByText('No favorite pokemon found');

  expect(noFavoriteText).toBeInTheDocument();
});

test('if show favorited pokemons', () => {
  const { history } = renderWithRouter(<App />);

  const detailsLink = screen.getByText(/More details/i);
  fireEvent.click(detailsLink);

  const favoriteInput = screen.getByLabelText(/Pokémon favoritado?/);
  fireEvent.click(favoriteInput);

  history.push('/favorites');

  const favoritesPokemons = screen.getByTestId('pokemon-name');
  expect(favoritesPokemons).toBeInTheDocument();
});

test('if none of the pokemons are in the favorites', () => {
  const { history } = renderWithRouter(<App />);
  const pokemonsCards = [];

  pokemons.forEach(() => {
    const pokemonCard = screen.getByTestId('pokemon-name');
    const nextPokemon = screen.getByText('Próximo pokémon');
    pokemonsCards.push(pokemonCard);
    fireEvent.click(nextPokemon);
  });

  history.push('/favorites');

  pokemonsCards.forEach((pokemon) => {
    expect(pokemon).not.toBeInTheDocument();
  });
});
