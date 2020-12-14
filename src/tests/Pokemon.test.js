import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import RenderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testing the Pokemon.js file', () => {
  const pikachu = pokemons[0];
  const {
    // id,
    name,
    type,
    averageWeight,
  } = pikachu;
  // const match = { params: { id: pikachu.id.toString() } };
  it('Test if a card with the information of a certain Pokémon is rendered', () => {
    const { getByText } = RenderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite={ false } />,
    );
    const pokeName = getByText(name);
    expect(pokeName).toBeInTheDocument();

    const pokeType = getByText(type);
    expect(pokeType).toBeInTheDocument();

    const pikachuWeight = getByText(
      `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
    );
    expect(pikachuWeight).toBeInTheDocument();

    const img = screen.getByRole('img', { Name: /pikachu sprite/i });
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('If the Pokémon card contains a link to view details of this Pokémon', () => {
    const { getByRole } = RenderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite={ false } />,
    );
    const link = getByRole('link', { Name: /More details/i });
    // console.log(link.href);
    expect(link.href).toBe('http://localhost/pokemons/25');
  });

  it('If click on the Pokémon link, will be redirected to the details page.', () => {
    const { getByRole } = RenderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite={ false } />,
    );
    const link = getByRole('link', { Name: /More details/i });
    // console.log(link.href);
    expect(link.href).toBe('http://localhost/pokemons/25');
  });
  it('If the URL displays / pokemon / <id>, with the details of the Pokémon.', () => {
    const { getByText, history } = RenderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite={ false } />,
    );
    fireEvent.click(getByText(/More details/i));
    const { pathname } = history.location;
    // console.log(pathname);
    expect(pathname).toBe('/pokemons/25');
  });
  it('If there is a star icon on favorite Pokémon.', () => {
    const { getByAltText } = RenderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite />,
    );
    const image = getByAltText(/Pikachu is marked as favorite/i);
    // console.log(image);
    expect(image).toHaveAttribute('src', '/star-icon.svg');
  });
});
