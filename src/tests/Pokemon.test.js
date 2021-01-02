import React from 'react';
import App from '../App';
import TestingRouter from '../components/TestingRouter';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';

afterEach(cleanup);

describe('fifth requirement', () => {
  it('should render the informations of a given Pokémon', () => {
    const {} = TestingRouter(
      <App
        pokemons={ pokemons }
      />
    )
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemonType');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img');

    expect(pokemonName.innerHTML).toBe('Pikachu');
    expect(pokemonType.innerHTML).toBe('Electric');
    expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');
    expect(pokemonImage.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage.alt).toBe('Pikachu sprite');
  });

  it('should render an url to the details of a given Pokémon', () => {
    const {} = TestingRouter(
      <App
        pokemons={ pokemons }
      />
    )
    const detailsBtn = screen.getByText(/more details/i);
    expect(detailsBtn.href).toContain('/pokemons/25');
  });

  it('should be redirected to the Detail Page when clicking in the button', () => {
    const { history } = TestingRouter(
      <App
        pokemons={ pokemons }
      />
    )
    const detailsBtn = screen.getByText(/more details/i);
    fireEvent.click(detailsBtn);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('should render an star icon if the Pokémon is marked as favorite', () => {
    const {} = TestingRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ true }
      />
    )
    const starIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(starIcon.src).toContain('/star-icon.svg');
  })
});
