import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';

describe('Requiriment 06', () => {
  test('1/5', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[7] } isFavorite={ false } />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemonType');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img', { name: /snorlax/i });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImage).toBeInTheDocument();

    expect(pokemonName).toHaveTextContent(/snorlax/i);
    expect(pokemonType).toHaveTextContent(/normal/i);
    expect(pokemonWeight).toHaveTextContent(/Average weight: 460.0 kg/i);
    expect(pokemonImage.src).toBe('https://cdn.bulbagarden.net/upload/4/40/Spr_5b_143.png');
  });

  test('2/5', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[7] } isFavorite={ false } />);

    const linkToMoreDetails = screen.getByText(/more details/i);

    expect(linkToMoreDetails).toBeInTheDocument();
    expect(linkToMoreDetails.tagName).toBe('A');
    expect(linkToMoreDetails.href).toBe('http://localhost/pokemons/143');
  });

  test('3/5', () => {
    renderWithRouter(<App />);

    const linkToMoreDetails = screen.getByText(/more details/i);

    fireEvent.click(linkToMoreDetails);
    const currentPokemonDetails = screen.getByText(/pikachu details/i);
    expect(currentPokemonDetails).toBeInTheDocument();
  });

  test('4/5', () => {
    const { history } = renderWithRouter(<App />);

    const linkToMoreDetails = screen.getByText(/more details/i);
    
    fireEvent.click(linkToMoreDetails);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/pokemons/25');
  });

  test('5/5', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[7] } isFavorite={ true } />);

    const favoriteImageByAltText = screen.getByAltText(/snorlax is marked as favorite/i);

    expect(favoriteImageByAltText.src).toBe('http://localhost/star-icon.svg');
  });
});
