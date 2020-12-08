import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

describe('Testing the file FavoritePokemons.js', () => {
  test('if the person does not have favorite Pokémon', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const route = '/favorites';
    history.push(route);
    const msnText = getByText(/No favorite pokemon found/i);
    expect(msnText).toBeInTheDocument();
  });
  test('displayed all favorite Pokémon cards', () => {
    const history = createMemoryHistory();
    const { getByText, getByRole } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const route = '/pokemons/4';
    history.push(route);
    const checkFavorite = getByRole('checkbox');
    fireEvent.click(checkFavorite);
    expect(checkFavorite.checked).toBeTruthy();
    history.push('/favorites');
    const favoriteText = getByText(/Charmander/i);
    expect(favoriteText).toBeInTheDocument();
  });
  test('no pokemon card is to apply', () => {
    const history = createMemoryHistory();
    const { queryByText, getByRole } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const route = '/pokemons/65';
    history.push(route);
    const checkFavorite = getByRole('checkbox');
    fireEvent.click(checkFavorite);
    expect(checkFavorite.checked).toBeTruthy();
    history.push('/favorites');
    const pikachu = queryByText(/Pikachu/i);
    expect(pikachu).not.toBeInTheDocument();
  });
});
