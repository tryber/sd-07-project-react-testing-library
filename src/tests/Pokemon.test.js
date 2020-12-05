import { fireEvent } from '@testing-library/react';
import React from 'react';
import Pokemon from '../components/Pokemon';
import Pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 6', () => {
  test('renderia um card', () => {
    const { getByTestId, getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ Pokemons[0] }
        isFavorite={ false }
      />,
    );
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName.textContent).toBe('Pikachu');
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType.textContent).toBe('Electric');
    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
    const pokemonImg = getByAltText('Pikachu sprite');
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test('renderiza o link do pokémon selecionado', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon
        pokemon={ Pokemons[0] }
        isFavorite={ false }
      />,
    );
    const buttonDetail = getByText('More details');
    expect(buttonDetail).toBeInTheDocument();
    fireEvent.click(buttonDetail);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/pokemons/25');
  });
  test('renderiza um ícone de favoritos', () => {
    const bool = true;
    const { getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ Pokemons[0] }
        isFavorite={ bool }
      />,
    );
    const imgFavorite = getByAltText('Pikachu is marked as favorite');
    expect(imgFavorite).toBeInTheDocument();
    expect(imgFavorite.src).toBe('http://localhost/star-icon.svg');
  });
});
