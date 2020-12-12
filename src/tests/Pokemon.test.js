import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import RenderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';

describe('Testing the Pokemon.js file', () => {
  const pikachu = {
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
        map:
          'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary:
      `This intelligent Pokémon roasts hard berries
      with electricity to make them tender enough to eat.`,
  };
  test('Test if a card with the information of a certain Pokémon is rendered', () => {
    const { getByText } = RenderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite={ false } />,
    );
    const name = getByText(pikachu.name);
    expect(name).toBeInTheDocument();

    const type = getByText(pikachu.type);
    expect(type).toBeInTheDocument();

    const pika = pikachu;
    const pikachuWeight = getByText(
      `Average weight: ${pika.averageWeight.value} ${pika.averageWeight.measurementUnit}`,
    );
    expect(pikachuWeight).toBeInTheDocument();

    const img = screen.getByRole('img', { Name: /pikachu sprite/i });
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test('If the Pokémon card contains a link to view details of this Pokémon', () => {
    const { getByRole } = RenderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite={ false } />,
    );
    const link = getByRole('link', { Name: /More details/i });
    expect(link.href).toBe('http://localhost/pokemons/25');
  });

  test('If click on the Pokémon link, will be redirected to the details page.', () => {
    const { getByRole } = RenderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite={ false } />,
    );
    const linkR = getByRole('link', { Name: /More details/i });
    fireEvent.click(linkR);
    // console.log(linkR.href);
    expect(linkR.href).toBe('http://localhost/pokemons/pokemons/25');
  });
  test('If the URL displays / pokemon / <id>, with the details of the Pokémon.', () => {
    const { getByText, history } = RenderWithRouter(<Pokemon
      pokemon={ pikachu }
      isFavorite={ false }
    />);
    fireEvent.click(getByText(/More details/i));
    const { pathname } = history.location;
    // console.log(pathname);
    expect(pathname).toBe('/pokemons/25');
  });
  test('If there is a star icon on favorite Pokémon.', () => {
    const { getByAltText } = RenderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite />,
    );
    const image = getByAltText(/Pikachu is marked as favorite/i);
    // console.log(image);
    expect(image).toHaveAttribute('src', '/star-icon.svg');
  });
});
