import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Verificando o FavoritePokemons.js', () => {
  it('Verifica se ao não ter favoritos, mostra nenhum pokemon', () => {
    const { queryByText } = renderWithRouter(<App />);
    const favoritePokemons = queryByText('Favorite Pokémons');
    fireEvent.click(favoritePokemons);
    const noFavorite = queryByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });
  it('Verifica se mostra todos os pokémons favoritados', () => {
    const { queryByText } = renderWithRouter(<App />);
    const favoritePokemons = queryByText('Favorite Pokémons');
    const details = queryByText('More details');
    fireEvent.click(details);
    const favoritePokeCheck = queryByText('Pokémon favoritado?');
    fireEvent.click(favoritePokeCheck);
    fireEvent.click(favoritePokemons);
    const pikachu = queryByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
  it('Verifica se o pokemon não é exibido após remover seu favorito', () => {
    const { queryByText } = renderWithRouter(<App />);
    const favoritePokemons = queryByText('Favorite Pokémons');
    const details = queryByText('More details');
    fireEvent.click(details);
    const favoritePokeCheck = queryByText('Pokémon favoritado?');
    fireEvent.click(favoritePokeCheck);
    fireEvent.click(favoritePokemons);
    fireEvent.click(details);
    fireEvent.click(favoritePokeCheck);
    fireEvent.click(favoritePokemons);
    const pikachu = queryByText('Pikachu');
    expect(pikachu).not.toBeInTheDocument();
  });
});
