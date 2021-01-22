import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import TestingRouter from '../components/TestingRouter';
import App from '../App';
import pokemons from '../data';
import { Pokemon } from '../components';

afterEach(cleanup);

describe('sixth requirement', () => {
  it('should render a pokémon card with proper informations', () => {
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
    expect(pokemonImage.alt).toBe('Pikachu sprite');
    expect(pokemonImage.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('should render pokémon details link', () => {
    const { getByText } = TestingRouter(
      <App
        pokemons={ pokemons }
      />,
    );
    const detailsBtn = getByText(/More details/i);
    expect(detailsBtn.href).toContain('/pokemons/25');
  });

  it('should render details page when click button', () => {
    const { history, getByText, queryByText } = TestingRouter(
      <App
        pokemons={ pokemons }
      />,
    );
    const detailsBtn = getByText(/More details/i);
    fireEvent.click(detailsBtn);
    const title = queryByText(/Pikachu details/i);
    expect(title).toBeInTheDocument();
    const { location } = history;
    expect(location.pathname).toBe('/pokemons/25');
  });

  it('should render favorite icon', () => {
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
