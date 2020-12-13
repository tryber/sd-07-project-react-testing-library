import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import { fireEvent, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';
import App from '../App';

describe('test Pokemons.js cards', () => {
  test('test Pokemons cards', () => {
    const { getByTestId, container } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toBeInTheDocument();
    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeInTheDocument();
    const pokemonImage = container.querySelectorAll('img')
    expect(pokemonImage.length.toString()).toBe('1');
  });

  test('test Pokemons cards of pokemon[6]', () => {
    const { getByTestId, container } = renderWithRouter(<Pokemon pokemon={ pokemons[6] } isFavorite={ false } />);

    const pokemonNameOf6 = getByTestId('pokemon-name');
    expect(pokemonNameOf6).toBeInTheDocument();
    const pokemonTypeOf6 = getByTestId('pokemonType');
    expect(pokemonTypeOf6).toBeInTheDocument();
    const pokemonWeightOf6 = getByTestId('pokemon-weight');
    expect(pokemonWeightOf6).toBeInTheDocument();
    const pokemonImageOf6 = container.querySelectorAll('img')
    expect(pokemonImageOf6.length.toString()).toBe('1');
  });

  test('test if more dateis is a link', () => {
    const { getByText } = renderWithRouter(<Pokemon pokemon={ pokemons[8] } isFavorite={ false } />);

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
    const { getByAltText } = renderWithRouter(<Pokemon pokemon={ pokemons[7] } isFavorite={true} />);

    const favoImage = getByAltText(/snorlax is marked as favorite/i);
    expect(favoImage.src).toBe('http://localhost/star-icon.svg');
  });
});
