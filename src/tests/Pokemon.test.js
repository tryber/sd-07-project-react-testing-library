import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';

afterEach(cleanup);

describe('Pokemon - teste de conteúdo', () => {
  it('Deve renderizar um card com as informações do Pokemon', () => {
    const { getByTestId, getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ false }
      />,
    );
    const pokemonName = getByTestId('pokemon-name').innerHTML;
    expect(pokemonName).toBe('Pikachu');

    const pokemonType = getByTestId('pokemonType').innerHTML;
    expect(pokemonType).toBe('Electric');

    const pokemonWeight = getByTestId('pokemon-weight').innerHTML;
    expect(pokemonWeight).toBe('Average weight: 6.0 kg');

    const pokemonImage = getByAltText('Pikachu sprite');
    const imgSource = pokemonImage.getAttribute('src');
    expect(imgSource).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Deve rendirecionar para Mais detalhes', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ false }
      />,
    );
    const moreDetailsLink = getByText('More details');
    expect(moreDetailsLink).toBeInTheDocument();
    fireEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Deve mostrar um icone de estrelha se favoritado', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite
      />,
    );
    const favIcon = getByAltText('Pikachu is marked as favorite');
    expect(favIcon).toBeInTheDocument();
    const favIconSrc = favIcon.getAttribute('src');
    expect(favIconSrc).toBe('/star-icon.svg');
  });
});
