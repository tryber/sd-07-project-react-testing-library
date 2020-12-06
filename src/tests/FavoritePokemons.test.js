import React from 'react';
import { fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('testing FavoritePokemons.js functionality', () => {
  it('Should render the mensagem page requested not found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const textNotFounf = getByText(/No favorite pokemon found/i);
    expect(textNotFounf).toBeInTheDocument();
  });

  it('Shoul show all favorites pokemons', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const moreDetails = getByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);
    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
    const favorite = getByText(/Favorite Pokémons/i);
    expect(favorite).toBeInTheDocument();
    fireEvent.click(favorite);
    const pikachuFavorite = getByText(/pikachu/i);
    expect(pikachuFavorite).toBeInTheDocument();
  });

  it('Should not render any card if theres not a favorite pokemon', () => {
    const { getByText, getByRole, queryByText } = renderWithRouter(<App />);

    const moreDetails = getByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);
    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toEqual(true);
    const favorite = getByText(/Favorite Pokémons/i);
    expect(favorite).toBeInTheDocument();
    fireEvent.click(favorite);
    const charmander = queryByText(/Charmander/i);
    expect(charmander).not.toBeInTheDocument();
  });
});
