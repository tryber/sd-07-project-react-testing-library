import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testa o arquivo Pokemon.js', () => {
  it('Testa se renderiza um card com infos do pokemon', () => {
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

  it('Testa se o card tem um link para exibir detalhes', () => {
    const pokemon = pokemons[0];
    const {
      getByText,
      history,
    } = renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);

    const details = getByText('More details');
    expect(details).toBeInTheDocument();

    fireEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Testa se existe um ícone de estrela no pokemon favoritado', () => {
    const pokemon = pokemons[0];
    const {
      getByAltText,
    } = renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);

    const star = getByAltText('Pikachu is marked as favorite');
    expect(star).toBeInTheDocument();
    expect(star.src).toContain('star');
  });
});
