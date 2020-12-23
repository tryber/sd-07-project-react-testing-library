import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('terceiro requisito', () => {
  test('se é exibido No favorite pokemon found, se não tiver pokémons favoritos', () => {
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

  test('se é exibido todos os cards de pokémons favoritados', () => {
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

  test('se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
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
