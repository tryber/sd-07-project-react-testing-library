import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

describe('3. Testando o arquivo FavoritePokemons.js', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<App />);

    const favorites = getByText(/Favorite Pokémons/i);
    fireEvent.click(favorites);

    const zeroFavorite = getByText('No favorite pokemon found');
    expect(zeroFavorite).toBeInTheDocument();
  });

  it('Teste se é exibido SOMENTE os cards de pokémons favoritados', () => {
    const {
      queryByText,
      getByText,
      getByLabelText,
      getAllByTestId,
      getByTestId,
    } = renderWithRouter(<App />);

    const home = getByText(/Home/i);
    fireEvent.click(home);

    const buttons = getAllByTestId('pokemon-type-button');
    const numberBug = 2;
    fireEvent.click(buttons[numberBug]);

    const details = getByText(/More details/i);
    fireEvent.click(details);

    const checkbox = getByLabelText('Pokémon favoritado?');
    fireEvent.click(checkbox);

    const pokemonName = getByTestId('pokemon-name').textContent;

    const favorites = getByText(/Favorite Pokémons/i);
    fireEvent.click(favorites);

    expect(getByText(pokemonName)).toBeInTheDocument();

    const othersPokemons = data.filter(
      (pokemon) => pokemon.name !== pokemonName,
    );

    othersPokemons.forEach((pokemon) => {
      expect(queryByText(pokemon.name)).not.toBeInTheDocument();
    });
  });
});
