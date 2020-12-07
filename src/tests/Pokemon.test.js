import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('6 - Testing the Pokemon.js file', () => {
  it('Should to test if a card is rendered with the information of a Pokémon.', () => {
    const { container, getByTestId } = renderWithRouter(<App />);
    const firstPokemon = getByTestId('pokemon-name');
    expect(firstPokemon).toBeInTheDocument();
    expect(firstPokemon.innerHTML).toBe('Pikachu');
    const typeFirstPokemon = getByTestId('pokemonType');
    expect(typeFirstPokemon).toBeInTheDocument();
    expect(typeFirstPokemon.innerHTML).toBe('Electric');
    const averagePokemon = getByTestId('pokemon-weight');
    expect(averagePokemon).toBeInTheDocument();
    expect(averagePokemon.innerHTML).toBe('Average weight: 6.0 kg');
    const imgFirsPokemon = container.querySelector('img').src;
    const altFirsPokemon = container.querySelector('img').alt;
    expect(altFirsPokemon).toBe('Pikachu sprite');
    expect(imgFirsPokemon).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Should to test if Pokémon card contains a link to view Pokémon details.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/i);
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);
    const firstPokemonDetails = getByText(/Pikachu Details/i);
    expect(firstPokemonDetails).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Should to test if the URL displayed when changes to / pokemon / <id>', () => {
    const { getAllByTestId, getByText, history } = renderWithRouter(<App />);
    const allTypesPokemons = getAllByTestId('pokemon-type-button');
    fireEvent.click(allTypesPokemons[1]);
    const secondPokemon = getByText(/Charmander/i);
    expect(secondPokemon).toBeInTheDocument();
    const moreDetails = getByText(/More details/i);
    fireEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/4');
  });
  it('Should to test if there is a star icon on favorite Pokémon.', () => {
    const { getByText, container } = renderWithRouter(<App />);
    const moreDetails = getByText(/More details/i);
    fireEvent.click(moreDetails);
    const favoritePokemon = getByText(/Pokémon favoritado/i);
    fireEvent.click(favoritePokemon);
    const favoriteIcon = container.querySelector('.favorite-icon').src;
    const altFavoriteIcon = container.querySelector('.favorite-icon').alt;
    const number = 16;
    const urlFavoriteIcon = favoriteIcon.substring(number);
    expect(urlFavoriteIcon).toBe('/star-icon.svg');
    expect(altFavoriteIcon).toBe('Pikachu is marked as favorite');
  });
});
