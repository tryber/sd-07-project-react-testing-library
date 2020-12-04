import React from 'react';
import { Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{ component }</Router>), history,
  });
};

describe('Testando o arquivo FavoritePokemons.js', () => {
  test('Shows mesage `No favorite pokemon found`', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const advise = getByText('No favorite pokemon found');
    expect(advise).toBeInTheDocument();
  });

  test('if all favorits Pokemons are in the document', () => {
    const { getByText, getByLabelText, getAllByText } = renderWithRouter(<App />);

    const fireButton = getByText('Fire');
    expect(fireButton).toBeInTheDocument();
    fireEvent.click(fireButton);

    const moreDetails = getByText('More details');
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);

    const selectFavorite = getByLabelText('Pokémon favoritado?');
    expect(selectFavorite).toBeInTheDocument();
    expect(selectFavorite.checked).toBe(false);
    fireEvent.click(selectFavorite);

    const favoriteElement = getByText('Favorite Pokémons');
    expect(favoriteElement).toBeInTheDocument();
    fireEvent.click(favoriteElement);

    const allMoreDetails = getAllByText('More details');
    expect(allMoreDetails[0]).toBeInTheDocument();
    const expectResult = 1;
    expect(allMoreDetails.length).toBe(expectResult);
  });

  test('if non-favorits Pokemons are not in the document', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);

    const fireButton = getByText('Fire');
    expect(fireButton).toBeInTheDocument();
    fireEvent.click(fireButton);

    const moreDetails = getByText('More details');
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);

    const selectFavorite = getByLabelText('Pokémon favoritado?');
    expect(selectFavorite).toBeInTheDocument();
    fireEvent.click(selectFavorite);

    const favoriteElement = getByText('Favorite Pokémons');
    expect(favoriteElement).toBeInTheDocument();
    fireEvent.click(favoriteElement);

    const advise = getByText('No favorite pokemon found');
    expect(advise).toBeInTheDocument();
  });
});
