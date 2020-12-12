import React from 'react';
import RenderWithRouter from './RenderWithRouter';
// import { fireEvent } from '@testing-library/react';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import { fireEvent } from '@testing-library/react';

describe('Test 6 - Pokemon.js', () => {
  it('Should to show all info about a pokemon', () => {
    const { getByTestId, getByRole } = RenderWithRouter(
      <App pokemons={ pokemons }>
        <Pokemon />
      </App>,
    );
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemonType');
    const pokemonWeight = getByTestId('pokemon-weight');
    const image = getByRole('img', { src: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png' });
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
  it('Should to contain a link with \'More details\'', () => {
    const { getByRole, history } = RenderWithRouter(
      <Pokemon pokemon={ pokemons[0] } />
      );
      const details = getByRole('link', { name: 'More details', src: `/pokemons/${pokemons[0].id}` });
      expect(details).toBeInTheDocument();
      fireEvent.click(details);
      const { pathname } = history.location;
      expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getAllByRole } = RenderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite />,
    );
    const image = getAllByRole('img', { src: '/star-icon.svg' });
    expect(image[1]).toBeInTheDocument();
  });
});