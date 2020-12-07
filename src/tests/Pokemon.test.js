import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemon from '../data';
import renderWithRouter from '../renderWithRouter';

test('Testando renderização de um pokemon', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const namePokemon = getByTestId('pokemon-name');
  const pokemonType = getByTestId('pokemonType');
  const pokemonWeight = getByTestId('pokemon-weight');
  const img = document.querySelector('img');

  expect(namePokemon.innerHTML).toBe('Pikachu');
  expect(pokemonType.innerHTML).toBe('Electric');
  expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');
  expect(img.src).toContain('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(img.alt).toBe('Pikachu sprite');
});

test('Testando se o card do Pokémon contém link de detalhes', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const details = getByText(/More details/i);

  expect(details).toBeInTheDocument();
  fireEvent.click(getByText(/More details/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
  const detailsPokemon = getByText(/Pikachu Details/i);
  expect(detailsPokemon).toBeInTheDocument();
});

test('Testando imagem de favorito', () => {
  const { getByAltText } = renderWithRouter(<Pokemon
    pokemon={ pokemon[0] }
    isFavorite
  />);
  const imgFavorite = getByAltText('Pikachu is marked as favorite');
  expect(imgFavorite.src).toContain('/star-icon.svg');
});
