import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testing Pokemon page', () => {
  test('a card is rendered with the information of a Pokémon.', () => {
    const { getByText, getByRole, getByTestId } = renderWithRouter(<App />);

    const namePokemon = getByText(/Pikachu/i);
    expect(namePokemon).toBeInTheDocument();

    const typePokemon = getByTestId(/pokemonType/i);
    expect(typePokemon).toHaveTextContent(/Electric/i);

    const averageWeightPokemon = getByText(/Average weight: 6.0 kg/i);
    expect(averageWeightPokemon).toBeInTheDocument();

    const imgSource = getByRole('img');
    expect(imgSource.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgSource.alt).toBe('Pikachu sprite');
  });

  test('the Pokémon card contains a link with details about the Pokémon', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const detailsPokemon = getByText(/Pikachu Details/i);
    expect(detailsPokemon).toBeInTheDocument();
  });

  test('contains a star icon for favorite pokemon', () => {
    const { getByText, getByAltText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    fireEvent.click(getByText(/Pokémon favoritado?/i));
    const imgFavorite = getByAltText(/Pikachu is marked as favorite/i);
    expect(imgFavorite.src).toBe('http://localhost/star-icon.svg');
  });
});
