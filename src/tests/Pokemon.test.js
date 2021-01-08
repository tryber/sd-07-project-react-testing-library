import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import { fireEvent } from '@testing-library/react';

describe('Testes do componente Pokemon', () => {
  test('Teste se renderiza card pokemon', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);

    const pokeName = getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent('Pikachu');

    const pokeType = getByTestId('pokemonType');
    expect(pokeType).toHaveTextContent('Electric');

    const pokeWeight = getByTestId('pokemon-weight');
    expect(pokeWeight).toHaveTextContent('Average weight: 6.0 kg');

    const pokeImage = getByAltText('Pikachu sprite');
    expect(pokeImage.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Teste se card possui link de navegação', () => {
    const { getByText, history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);

    const linkPoke = getByText('More details');
    expect(linkPoke).toBeInTheDocument();

    fireEvent.click(linkPoke);
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });
});
