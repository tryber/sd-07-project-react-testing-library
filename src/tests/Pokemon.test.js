import React from 'react';
import { cleanup, screen, fireEvent } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import RenderWithRouter from './RenderWithRouter';
import data from '../data';

afterEach(cleanup);

const pokemon = data[6];
const Render = (favorite = false) => (
  RenderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ favorite } />)
);

test('if a card is rendered with the information of a certain Pokémon', () => {
  const { container } = Render();
  expect(screen.getByText(/Rapidash/i)).toBeInTheDocument();
  expect(screen.getByText(/Fire/i)).toBeInTheDocument();
  expect(screen.getByText(/Average weight: 95.0 kg/i)).toBeInTheDocument();
  const image = container.querySelector('img');
  expect(image).toHaveAttribute(
    'src',
    'https://cdn.bulbagarden.net/upload/5/58/Spr_5b_078.png',
  );
  expect(image).toHaveAttribute('alt', 'Rapidash sprite');
});

test(
  'if the Pokémon card indicated on the Pokédex'
    + 'contains a navigation link to display details of this Pokémon',
  () => {
    const { getByText, history } = Render();
    const link = getByText('More details');
    expect(history.location.pathname).toBe('/');
    fireEvent.click(link);
    expect(history.location.pathname).toBe('/pokemons/78');
  },
);

test('if there is a star icon on favorite Pokémon', () => {
  const { container } = Render(true);
  const icon = container.querySelector('.favorite-icon');
  expect(icon).toHaveAttribute('src', '/star-icon.svg');
  expect(icon).toHaveAttribute('alt', 'Rapidash is marked as favorite');
});
