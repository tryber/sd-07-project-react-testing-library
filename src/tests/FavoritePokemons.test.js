import React from 'react';
import { fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';

describe('Testando o arquivo FavoritePokemons.js', () => {
  test('Se não há favoritos, exibe mensagem "No favorite pokemon found"', () =>{
    const { getByText } = RenderWithRouter(<FavoritePokemons />);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
test('é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText } = RenderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    fireEvent.click(getByText(/pokémon favoritado?/i));
    const zero = 0;
    const { getAllByTestId } = RenderWithRouter(<FavoritePokemons />);
    expect(getAllByTestId(/pokemon-name/i).length).not.toBe(zero);
  });
});
