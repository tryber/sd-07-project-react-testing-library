import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('testing file FavoritePokemons.js', () => {

  afterEach(cleanup);

  it('the message "No favorite pokemon found" appears when the person does not have favorite pokemon', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] }/>);
    const notFound = getByText(/No favorite pokemon found/i);
    expect(notFound).toBeVisible();
  })

  it('the message "No favorite pokemon found" appears when the person does not have favorite pokemon', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] }/>);
    const notFound = getByText(/No favorite pokemon found/i);
    expect(notFound).toBeVisible();
  })


})

/* isPokemonFavoriteById */