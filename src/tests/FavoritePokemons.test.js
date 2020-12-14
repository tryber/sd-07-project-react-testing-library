import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa FavoritePokemons.js - requirement3', () => {
  it('É exibido a msg No favorite pokemon found se n tiver pokémons favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const notFoundFavorite = getByText(/No favorite pokemon found/i);
    expect(notFoundFavorite).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const moreDetailsLink = getByText(/More Details/i);
    fireEvent.click(moreDetailsLink);
    fireEvent.click(getByRole('checkbox'));
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const thereIsPokemon = getByText(/Average weight/i);
    expect(thereIsPokemon).toBeInTheDocument();
  });

  it('Nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons />);
    const thereIsPokemon = queryByText(/Average weight/i);
    expect(thereIsPokemon).not.toBeInTheDocument();
  });
});
