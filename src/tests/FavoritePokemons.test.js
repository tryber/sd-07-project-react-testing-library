import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste se a aplicação é redirecionada'
+ 'para a página de Pokémons Favoritados, na URL'
+ 'favorites, ao clicar no link Favorite Pokémons'
+ 'da barra de navegação', () => {
  it('Deve renderizar o componente FavoritePokemons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');

    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });
});
