import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Pokemon } from '../components';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('test Pokemon component', () => {
  it('render a card with the pokemon informations', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
    />);
    const name = getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    const type = getByTestId('pokemonType');
    expect(type).toHaveTextContent(/Electric/i);
    expect(name).toHaveTextContent(/Pikachu/i);
    const weight = getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();
    expect(weight).toHaveTextContent(/Average weight: 6.0 kg/i);
    const image = getByAltText(/Pikachu sprite/i);
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('test link navigation to render details about pokémon', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
    />);
    const linkDetails = getByRole('link', { name: /More details/i });
    expect(linkDetails).toBeInTheDocument();
    expect(linkDetails).toHaveAttribute('href', '/pokemons/25');
  });

  it('redirect to details page', () => {
    const { getByRole, history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
    />);
    const linkDetails = getByRole('link', { name: /More details/i });
    expect(linkDetails).toBeInTheDocument();
    fireEvent.click(linkDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('icon stars in favorite pokémons', () => {
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite
    />);
    const starImage = getByAltText(/Pikachu is marked as favorite/i);
    expect(starImage).toHaveAttribute('src', '/star-icon.svg');
  });
});
