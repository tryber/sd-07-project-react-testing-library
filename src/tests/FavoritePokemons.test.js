import React from 'react';
import { fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('FavotirePokemons.js', () => {
  it(
    `deve renderizar a mesnagem 'No favorite pokemon found', se não houver
    pokémons favortos`,
    () => {
      const { getByText } = renderWithRouter(<App />);
      const buttonFavoritePokemons = getByText(/favorite pokémons/i);
      fireEvent.click(buttonFavoritePokemons);

      const favoritePokemonsTitle = getByText('No favorite pokemon found');
      expect(favoritePokemonsTitle.textContent).toBe('No favorite pokemon found');
    },
  );

  it('deve exibir todos os cards de pokemons favoritos', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ [pokemons[5], pokemons[2]] } />,
    );

    const mew = getByText(/mew/i);
    const caterpie = getByText(/caterpie/i);
    expect(mew.textContent).toBe('Mew');
    expect(caterpie.textContent).toBe('Caterpie');
  });

  it('não deve exibir cards de pokemons não favoritados', () => {
    const { queryAllByText } = renderWithRouter(
      <FavoritePokemons pokemons={ [] } />,
    );

    const favoritePokemonsTitle = queryAllByText('More details');
    expect(favoritePokemonsTitle[0]).toBe(undefined);
  });
});
