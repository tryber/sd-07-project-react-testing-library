import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';
import App from '../App';

describe('test Pokemons.js cards', () => {
  test('test Pokemons cards', () => {
    const { getByTestId, container } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);

    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toBeInTheDocument();
    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeInTheDocument();
    const pokemonImage = container.querySelectorAll('img');
    expect(pokemonImage.length.toString()).toBe('1');

    expect(pokemonName).toHaveTextContent(/Pikachu/i);
    expect(pokemonType).toHaveTextContent(/Electric/i);
    expect(pokemonWeight).toHaveTextContent(/Average weight: 6.0 kg/i);
  });

  test('test Pokemons cards of pokemon[6]', () => {
    const { getByTestId, container } = renderWithRouter(<Pokemon
      pokemon={ pokemons[6] }
      isFavorite={ false }
    />);

    const pokemonNameOf6 = getByTestId('pokemon-name');
    expect(pokemonNameOf6).toBeInTheDocument();
    const pokemonTypeOf6 = getByTestId('pokemonType');
    expect(pokemonTypeOf6).toBeInTheDocument();
    const pokemonWeightOf6 = getByTestId('pokemon-weight');
    expect(pokemonWeightOf6).toBeInTheDocument();
    const pokemonImageOf6 = container.querySelectorAll('img');
    expect(pokemonImageOf6.length.toString()).toBe('1');
  });

  test('test if more dateis is a link', () => {
    const { getByText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[8] }
      isFavorite={ false }
    />);

    const linkDetails = getByText(/more details/i);

    expect(linkDetails).toBeInTheDocument();
    expect(linkDetails.tagName).toBe('A');
    expect(linkDetails.href).toBe('http://localhost/pokemons/148');
  });

  test('test if /detais for each pokemon exist', () => {
    const { getByText } = renderWithRouter(<App />);

    const buttonDetails = getByText(/more details/i);
    fireEvent.click(buttonDetails);
    const pokeDetails = getByText(/pikachu details/i);
    expect(pokeDetails).toBeInTheDocument();
  });

  test('test the route for details', () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const buttonDetails = getByText(/more details/i);
    fireEvent.click(buttonDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('test if the favorite star exist', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/i));
    fireEvent.click(getByText(/Pokémon favoritado/i));
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const favoPoke = getByText(/Pikachu/i);
    expect(favoPoke).toBeInTheDocument();
  });
});
