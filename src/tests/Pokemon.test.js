import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import TestingRouter from '../components/TestingRouter';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';

afterEach(cleanup);

describe('fifth requirement', () => {
  it('should render the informations of a given Pokémon', () => {
    const { getByTestId, getByRole } = TestingRouter(
      <App
        pokemons={ pokemons }
      />,
    );
    const pokemonName = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemonType');
    const pokemonWeight = getByTestId('pokemon-weight');
    const pokemonImage = getByRole('img');

    expect(pokemonName.innerHTML).toBe('Pikachu');
    expect(pokemonType.innerHTML).toBe('Electric');
    expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');
    expect(pokemonImage.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage.alt).toBe('Pikachu sprite');
  });

  it('should render an url to the details of a given Pokémon', () => {
    const { getByText } = TestingRouter(
      <App
        pokemons={ pokemons }
      />,
    );
    const detailsBtn = getByText(/more details/i);
    expect(detailsBtn.href).toContain('/pokemons/25');
  });

  it('should be redirected to the Detail Page when clicking in the button', () => {
    const { history, getByText } = TestingRouter(
      <App
        pokemons={ pokemons }
      />,
    );
    const detailsBtn = getByText(/more details/i);
    fireEvent.click(detailsBtn);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('should render an star icon if the Pokémon is marked as favorite', () => {
    const { getByAltText } = TestingRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite
      />,
    );
    const starIcon = getByAltText('Pikachu is marked as favorite');
    expect(starIcon.src).toContain('/star-icon.svg');
  });
});
