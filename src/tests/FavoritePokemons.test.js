import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Requisito 3: Testando o arquivo FavoritePokemons.js', () => {
  it('Testa se é exibido na tela a mensagem No favorite pokemon found.', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons />);

    const noFavoriteMessage = queryByText(/No favorite pokemon found/i);
    // console.log(noFavoriteMessage);
    expect(noFavoriteMessage).toBeInTheDocument();
  });

  it('Testa se é exibido todos os cards de pokémons favoritados.', () => {
    const { queryByText, getByAltText } = renderWithRouter(<App />);
    fireEvent.click(queryByText(/More details/i));
    fireEvent.click(queryByText(/Pokémon favoritado?/i));
    const favoritePokemonImage = getByAltText(/is marked as favorite/i);

    expect(favoritePokemonImage).toBeInTheDocument();
  });

  it('Testa se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons />);
    const noFavoriteMessage = queryByText(/No favorite pokemon found/i);

    expect(noFavoriteMessage).toBeDefined();
  });
});
