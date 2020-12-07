import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

afterEach(cleanup);

describe('Teste da tela Pokemon', () => {
  const pokemonObj = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
  };
  it('test that there is a rendered Pokemon of information', () => {
    const { getByTestId, getByRole } = renderWithRouter(
      <Pokemon pokemon={ pokemonObj } isFavorite={ false } />,
    );
    const name = getByTestId('pokemon-name');
    const type = getByTestId('pokemonType');
    const pokemonWeight = getByTestId('pokemon-weight');
    const image = getByRole('img');

    expect(name).toBeInTheDocument();
    expect(name.textContent).toBe('Pikachu');
    expect(type).toBeInTheDocument();
    expect(type.textContent).toBe('Electric');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight.textContent).toContain('Average weight: 6.0 kg');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image.alt).toContain('Pikachu sprite');
  });
  it('tests for link to Pokémon page', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon pokemon={ pokemonObj } isFavorite={ false } />,
    );
    const link = getByRole('link');

    expect(link).toBeInTheDocument();
    expect(link.href).toContain('/pokemons/25');
    expect(link.textContent).toContain('More details');
  });
  it('tests that the link redirects to the PokemonDetails page', () => {
    const { getByRole, history } = renderWithRouter(
      <Pokemon pokemon={ pokemonObj } isFavorite={ false } />,
    );
    const link = getByRole('link');

    fireEvent.click(link);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
  it('Test whether there is a star icon in favorite Pokémon', () => {
    const { container } = renderWithRouter(
      <Pokemon pokemon={ pokemonObj } isFavorite />,
    );
    const starImage = container.getElementsByClassName('favorite-icon');
    const amountOfImage = 1;

    expect(starImage.length).toBe(amountOfImage);
    expect(starImage[0]).toBeInTheDocument();
    expect(starImage[0].src).toContain('/star-icon.svg');
    expect(starImage[0].alt).toBe('Pikachu is marked as favorite');
  });
});
