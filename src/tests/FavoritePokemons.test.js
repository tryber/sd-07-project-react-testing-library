import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('3rd req', () => {
  test('if "No favorite pokemon found" shows up, if there is no fav pok', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const favorite = getByText('Favorite Pokémons');
    fireEvent.click(favorite);
    const noFavorite = getByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });

  test('if shows all the fav pok cards', () => {
    const history = createMemoryHistory();
    const { getByText, getByLabelText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const pikachuDetails = '/pokemons/25';
    history.push(pikachuDetails);
    const labelInput = getByLabelText('Pokémon favoritado?');
    userEvent.click(labelInput);
    expect(labelInput).toBeChecked();
    fireEvent.click(getByText('Favorite Pokémons'));
    const pokemonName = getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();
  });

  test('If none pok card shows up if it is not a favorite one', () => {
    const history = createMemoryHistory();
    const { getByText, getByLabelText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const pikachuDetails = '/pokemons/25';
    history.push(pikachuDetails);
    const labelInput = getByLabelText('Pokémon favoritado?');
    userEvent.click(labelInput);
    expect(labelInput).not.toBeChecked();
    fireEvent.click(getByText('Favorite Pokémons'));
    const noFavorite = getByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });
});
