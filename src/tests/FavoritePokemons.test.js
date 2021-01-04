import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from '../renderWhithRouter';
import { FavoritePokemons } from '../components';
import data from '../data';

describe('Testing FavoritePokemons.js <¬ Checks if:', () => {
  test('the message "No favorite pokemon found"', () => {
    const { getByText } = render(<FavoritePokemons pokemons={ [] } />);
    const noFavorite = getByText(/(No favorite) (pokemon found)/i);
    expect(noFavorite).toBeInTheDocument();
  });

  test('all favorited pokémons are rendered.', () => {
    const myMock = ['Pikachu', 'Ekans'];
    const mockFavs = data.filter((pokemon) => myMock.includes(pokemon.name));
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ mockFavs } />,
    );
    const favMark = getAllByTestId(/pokemon-name/i);
    expect(favMark).toHaveLength(myMock.length);
  });

  test('no favorited pokémons are rendered.', () => {
    const myMock = ['Pikachu', 'Ekans'];
    const mockFavs = data.filter((pokemon) => myMock.includes(pokemon.name));
    const { getByText, queryByText } = renderWithRouter(
      <FavoritePokemons pokemons={ mockFavs } />,
    );
    const negMock = data
      .filter((pokemon) => !myMock.includes(pokemon.name))
      .map((pokemon) => pokemon.name);
    expect.assertions(negMock.length + myMock.length);

    negMock.forEach((element) => {
      const pokemon = queryByText(element);
      expect(pokemon).toBeNull();
    });

    myMock.forEach((element) => {
      const pokemon = getByText(element);
      expect(pokemon).toBeInTheDocument();
    });
  });
});
