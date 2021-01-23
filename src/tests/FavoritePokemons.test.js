import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testing favorite pokemon behaviour', () => {
  it('Tests if required message appears when no pokemon is selected as favorite', () => {
    const { getByText } = renderWithRouter(<App />);
    const favoritePokemons = getByText(/Favorite Pokémons/i);
    fireEvent.click(favoritePokemons);
    const noFavoritesMsg = getByText(/No favorite pokemon found/i);
    expect(noFavoritesMsg).toBeInTheDocument();
  });

  it('Tests if all favorited Pokémons appear on favorites section', () => {
    const {
      getByText,
      history,
      getAllByTestId,
      getByLabelText,
    } = renderWithRouter(<App />);
    history.push('/');
    const favorite1 = getByText(/Pikachu/i);
    expect(favorite1).toBeInTheDocument();
    const details = getByText(/More details/i);
    fireEvent.click(details);
    const favoritado = getByLabelText('Pokémon favoritado?');
    expect(favoritado).toBeInTheDocument();
    expect(favoritado.type).toBe('checkbox');
    expect(favoritado.checked).toBe(false);
    fireEvent.click(favoritado);
    expect(favoritado.checked).toBe(true);
    history.push('/favorites');
    const isFavorite1In = getAllByTestId('pokemon-name');
    expect((isFavorite1In.length).toString()).toBe('1');
    expect(isFavorite1In[0]).toBeInTheDocument();
  });

  it('Tests if after unfavoriting a Pokémon it stop to appear on favorites', () => {
    const { history, getByLabelText, getByText } = renderWithRouter(<App />);
    history.push('/');
    const favorite1 = getByText(/Pikachu/i);
    expect(favorite1).toBeInTheDocument();
    const details = getByText(/More details/i);
    fireEvent.click(details);
    const favoritado = getByLabelText('Pokémon favoritado?');
    expect(favoritado).toBeInTheDocument();
    expect(favoritado.type).toBe('checkbox');
    expect(favoritado.checked).toBe(true);
    fireEvent.click(favoritado);
    expect(favoritado.checked).toBe(false);
    history.push('/favorites');
    const noFavoritesMsg = getByText(/No favorite pokemon found/i);
    expect(noFavoritesMsg).toBeInTheDocument();
  });
});
