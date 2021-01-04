import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testando o arquivo "FavoritePokemon"', () => {
  test('Teste se é exibida a mensagem No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const texto = getByText(/No favorite pokemon found/i);
    expect(texto).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { container } = renderWithRouter(<FavoritePokemons />);
    const [fav] = container.getElementsByClassName('favorite-pokemon');
    expect(fav).toBe();
  });

  test('Verifica se a pagina About renderiza dois <p>', () => {
    const { container } = renderWithRouter(<FavoritePokemons />);
    const [p] = container.getElementsByTagName('p');
    expect(p).toBeInTheDocument();
    expect(p).toHaveTextContent('No favorite pokemon found');
  });
});
