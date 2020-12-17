import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testando o arquivo Pokedex.js', () => {
  it('é renderizado um card com as informações de determinado pokémon', () => {
    const pokemon = pokemons[0];
    const {
      getByTestId,
      getByAltText,
    } = renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);

    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent('Electric');

    const averageWeight = getByTestId('pokemon-weight');
    expect(averageWeight).toHaveTextContent('Average weight: 6.0 kg');

    const pokemonImage = getByAltText('Pikachu sprite');
    expect(pokemonImage.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('o card contém um link de navegação para exibir detalhes', () => {
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

  it('existe um ícone de estrela nos Pokémons favoritados', () => {
    const pokemon = pokemons[0];
    const {
      getByAltText,
    } = renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);

    const star = getByAltText('Pikachu is marked as favorite');
    expect(star).toBeInTheDocument();
    expect(star.src).toContain('/star-icon.svg');
  });
});
