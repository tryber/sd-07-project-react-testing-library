import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { PokemonDetails } from '../components';
import pokemons from '../data';

describe('Testing PokemonDetails.js file', () => {
  test('renders detailed informations about the Pokemon', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { 151: true } }
        match={ { params: { id: '151' } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    expect(screen.getByText('Mew Details')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Summary' })).toBeInTheDocument();
    expect(screen.getByText(
      'Apparently, it appears only to those people who are pure of heart '
      + 'and have a strong desire to see it.',
    )).toBeInTheDocument();
  });

  test('renders a map section containing the Pokemon`s location', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { 151: true } }
        match={ { params: { id: '151' } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    expect(screen.getByRole('heading', { name: 'Game Locations of Mew' }))
      .toBeInTheDocument();
    expect(screen.getByText('Faraway Island')).toBeInTheDocument();
    expect(screen.getByAltText('Mew location')).toHaveAttribute(
      'src', 'https://cdn.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png',
    );
  });

  test('renders a checkbox to choose a Pokemon as favorite', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { 151: true } }
        match={ { params: { id: '151' } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    const favoritePokemonCheckbox = screen.getByRole('checkbox');

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(favoritePokemonCheckbox).toBeChecked();
    fireEvent.change(favoritePokemonCheckbox, { target: { checked: false } });
    expect(favoritePokemonCheckbox).not.toBeChecked();
    expect(screen.getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
  });
});
