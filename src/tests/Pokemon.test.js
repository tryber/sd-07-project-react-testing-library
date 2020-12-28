import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Pokemons tests', () => {
  it('Test if a card with the information of a certain Pokémon is rendered', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);

    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('6.0 kg');

    const pokemonImg = getByAltText('Pikachu sprite');
    const url = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg.src).toBe(url);
  });

  it('Test if the Pokémon card indicated on the Pokédex contains...', () => {
    const { getByText } = renderWithRouter(<App />);
    const pokemonDetails = getByText('More details');
    expect(pokemonDetails).toBeInTheDocument();
    expect(pokemonDetails.href).toBe('http://localhost/pokemons/25');
  });

  it('Test if clicking on the Pokémons navigation link redirects the...', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const pokemonDetails = getByText('More details');
    fireEvent.click(pokemonDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Test if there is a star icon on favorite Pokémon', () => {
    const { getByAltText, getByText, getByLabelText } = renderWithRouter(<App />);
    const pokemonDetails = getByText('More details');
    fireEvent.click(pokemonDetails);
    const pokemonFavorite = getByLabelText('Pokémon favoritado?');
    expect(pokemonFavorite).toBeInTheDocument();
    fireEvent.click(pokemonFavorite);
    const favoriteStar = getByAltText('Pikachu is marked as favorite');
    expect(favoriteStar).toBeInTheDocument();
    expect(favoriteStar.src).toBe('http://localhost/star-icon.svg');
  });
});
