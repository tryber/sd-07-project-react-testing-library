import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRoute from '../components/renderWithRoute';

describe('Testando o componente FavoritePokemons', () => {
  it('Testando se não há cards pokemons', () => {
    const { queryByTestId, getByText } = renderWithRoute(<App />);
    fireEvent.click(getByText('Favorite Pokémons'));
    const idsName = queryByTestId('pokemon-name');
    expect(idsName).toBeNull();
  });
  it('Testando se não existem pokemons favoritos', () => {
    const { getByText } = renderWithRoute(<App />);
    fireEvent.click(getByText('Favorite Pokémons'));
    const semPokemons = getByText('No favorite pokemon found');
    expect(semPokemons).toBeInTheDocument();
  });
  it('Testando se o componente renderiza todos favoritos', () => {
    const { getByText, history } = renderWithRoute(<App />);
    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Pokémon favoritado?'));
    history.push('/pokemons/4');
    fireEvent.click(getByText('Pokémon favoritado?'));
    fireEvent.click(getByText('Favorite Pokémons'));
    const pokemon1 = getByText('Pikachu');
    const pokemon2 = getByText('Charmander');
    expect(pokemon1).toBeInTheDocument();
    expect(pokemon2).toBeInTheDocument();
  });
});
