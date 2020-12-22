import React from 'react';
import { fireEvent, getByLabelText } from '@testing-library/dom';
import data from '../data';
import App from '../App';
import renderWhitRouter from '../RenderWhitRouter';

describe('Testing favorite pokemons', () => {
  it('Testing if the message No favorite pokemon found is displayed', () => {
    const { getByText } = renderWhitRouter(<App />);
    const favoritePokemons = getByText(/Favorite Pokémons/i);
    fireEvent.click(favoritePokemons);

    const noFavorite = getByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });

  it('Test whether all favorite Pokémon cards are displayed ', () => {
    const {
      queryByText,
      getByText,
      getAllByTestId,
      getByTestId,
      getByLabelText,
    } = renderWhitRouter(<App />);

    const home = getByText(/Home/i);
    fireEvent.click(home);

    const buttons = getAllByTestId('pokemon-type-button');
    const butonNumber = 2;
    fireEvent.click(buttons[butonNumber]);

    const moreDetail = getByText(/More details/i);
    fireEvent.click(moreDetail);

    const checkBox = getByLabelText(/Pokémon favoritado?/i);
    fireEvent.click(checkBox);

    const pokemon = getByTestId('pokemon-name').textContent;

    const favoreitePokemon = getByText(/Favorite Pokémons/i);
    fireEvent.click(favoreitePokemon);

    expect(getByText(pokemon)).toBeInTheDocument();

    const otherPokemons = data.filter(
      (pokemons) => pokemons.name !== pokemon,
    );

    otherPokemons.forEach((actual) => {
      expect(queryByText(actual.name)).not.toBeInTheDocument();
    });
  });
});
