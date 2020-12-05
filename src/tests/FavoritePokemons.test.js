import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import '@testing-library/jest-dom';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testando o arquivo FavoritePokemons.js, requisito 3', () => {
  it('Teste se a mensagem "No favorite pokemon found", se não tiver favoritos.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFavorite = getByText(/No favorite pokemon found/i);
    expect(notFavorite).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);
    history.push('/pokemons/151');
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeTruthy();
    history.push('/favorites');
    const mew = getByText(/Mew/i);
    expect(mew).toBeInTheDocument();
  });

  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    const { queryByText, getByRole, history } = renderWithRouter(<App />);
    history.push('/pokemons/65');
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeTruthy();
    history.push('/favorites');
    const pikachu = queryByText(/Pikachu/i);
    expect(pikachu).not.toBeInTheDocument();
  });
});
