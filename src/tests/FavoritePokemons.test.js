import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('favorito', () => {
  it('test favorito', () => {
    const { queryByTestId, history } = renderWithRouter(<App />);
    history.push('/favorites');
    const about = queryByTestId('pokemon-name');
    expect(about).toBeNull();
  });

  it('test favorito', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/favorites');
    const about = getByText('No favorite pokemon found');
    expect(about).toBeInTheDocument();
  });

  it('test favorito', () => {
    const { getAllByTestId, getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    fireEvent.click(getByText('Pokémon favoritado?'));
    fireEvent.click(getByText('Home'));
    history.push('/pokemons/4');
    fireEvent.click(getByText('Pokémon favoritado?'));
    fireEvent.click(getByText('Favorite Pokémons'));
    const arraypokemon = getAllByTestId('pokemon-name');
    expect(arraypokemon[0]).toBeInTheDocument();
  });
});
