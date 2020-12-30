import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('FavoritePokemons.js', () => {
  test('renders `No favorite pokemon found`', () => {
    const { getByText } = render(<FavoritePokemons />);

    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  test('renders all favorite Pokemons', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Pokémon favoritado?'));
    fireEvent.click(getByText('Favorite Pokémons'));

    const pokemons = document.getElementsByClassName('favorite-pokemons').length;
    const size = 1;

    expect(pokemons).toBe(size);
  });

  test('renders no cards, if there is none favorite Pokemons', () => {
    render(<FavoritePokemons />);

    const pokemons = document.getElementsByClassName('favorite-pokemons').length;
    const size = 0;

    expect(pokemons).toBe(size);
  });
});
