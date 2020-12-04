import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('Testa o arquivo Pokemon.js', () => {
  it('testa se é mostrado um card com os dados do pokemon', () => {
    const pokemon = pokemons[0];
    const {
      getByTestId,
      getByAltText } = renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);

    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent('Electric');

    const averageWeight = getByTestId('pokemon-weight');
    expect(averageWeight).toHaveTextContent('Average weight: 6.0 kg');

    const pokemonImage = getByAltText('Pikachu sprite');
    expect(pokemonImage.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('testa se possui um link de navegação para exibir detalhes', () => {
    const pokemon = pokemons[0];
    const {
      getByText,
      history,
    } = renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);

    const moreDetails = getByText('More details');
    expect(moreDetails).toBeInTheDocument();

    fireEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('testa se existe um ícone de estrela no pokemon favoritado', () => {
    const pokemon = pokemons[0];
    const {
      getByAltText,
    } = renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);

    const starFavorite = getByAltText('Pikachu is marked as favorite');
    expect(starFavorite).toBeInTheDocument();
    expect(starFavorite.src).toContain('star');
  });
});
