import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o arquivo FavoritePokemons.js', () => {
  it(`Teste se é exibido na tela a mensagem No favorite pokemon found,
      se a pessoa não tiver pokémons favoritos.`, () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/));
    const pokedex = /No favorite pokemon found/i;
    expect(getByText(pokedex)).toBeInTheDocument();
  });

  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    const { getByText, queryByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/));
    const noPokemon = queryByText(/More details/i);
    expect(noPokemon).toBeNull();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    fireEvent.click(getByLabelText(/Pokémon favoritado/i));
    fireEvent.click(getByText('Home'));
    fireEvent.click(getByText('Fire'));
    fireEvent.click(getByText('More details'));
    fireEvent.click(getByLabelText(/Pokémon favoritado/i));
    fireEvent.click(getByText('Favorite Pokémons'));
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getByText('Charmander')).toBeInTheDocument();
  });
});
