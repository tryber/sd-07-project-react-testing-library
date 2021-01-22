import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

afterEach(cleanup);
describe('Testando o arquivo `FavoritePokemons.js`', () => {
  it('Verifica se é exibido o texto `No favorite pokemon found`', () => {
    const { getByText } = renderWithRouter(<App />);
    const favorite = getByText('Favorite Pokémons');
    fireEvent.click(favorite);
    const message = getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });

  it('Verifica se são exibidos todos os pokémons favoritados', () => {
    const { getByText } = renderWithRouter(<App />);
    const { getAllByTestId } = renderWithRouter(<FavoritePokemons />);
    const pokemons = getAllByTestId('pokemon-name');
    const moreDetails = getByText('More details');
    fireEvent.click(moreDetails);
    const favorited = getByText('Pokémon favoritado?');
    fireEvent.click(favorited);
    const number = 0;
    expect(pokemons.length).not.toBe(number);
  });

  it('Verifica se nenhum pokémon é favoritado', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const message = getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });
});
