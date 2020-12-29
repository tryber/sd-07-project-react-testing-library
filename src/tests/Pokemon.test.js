import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Pokemon } from '../components';
import pokemons from '../data';
import renderWhitRouter from '../RenderWhitRouter';

describe('Testing Pokémon card', () => {
  test('Testing whether the card renders with pokemon information', () => {
    const { getByTestId } = renderWhitRouter(<Pokemon
      pokemon={ pokemons[0] }
      showDetailsLink={ false }
      isFavorite={ false }
    />);

    const name = getByTestId(/pokemon-name/i);
    expect(name.innerHTML).toBe('Pikachu');
    const type = getByTestId(/pokemonType/i);
    expect(type.innerHTML).toBe('Electric');
  });

  test('Testing the pokemons units of measure', () => {
    const { getByTestId } = renderWhitRouter(<Pokemon
      pokemon={ pokemons[0] }
      showDetailsLink={ false }
      isFavorite={ false }
    />);

    const weight = getByTestId(/pokemon-weight/i);
    expect(weight.innerHTML).toBe('Average weight: 6.0 kg');
  });

  test('Testing if the pokemon image is shown correctly', () => {
    const { container } = renderWhitRouter(<Pokemon
      pokemon={ pokemons[0] }
      showDetailsLink={ false }
      isFavorite={ false }
    />);
    const image = container.querySelector('img');
    expect(image).toHaveAttribute('alt', 'Pikachu sprite');
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Testing more details link', () => {
    const { container } = renderWhitRouter(<Pokemon
      pokemon={ pokemons[0] }
      showDetailsLink
      isFavorite={ false }
    />);
    const moreLink = container.querySelector('a');
    expect(moreLink).toHaveAttribute('href', '/pokemons/25');
    expect(moreLink.innerHTML).toBe('More details');
  });

  test('Testins if more detail link redirect user', () => {
    const { getByText, history } = renderWhitRouter(<Pokemon
      pokemon={ pokemons[0] }
      showDetailsLink
      isFavorite={ false }
    />);

    const link = getByText(/More details/i);
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/pokemons/25');
    fireEvent.click(link);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Testing of the favorite star is shown', () => {
    const { container } = renderWhitRouter(<Pokemon
      pokemon={ pokemons[0] }
      showDetailsLink
      isFavorite
    />);

    const favoriteStar = container.querySelector('.favorite-icon');
    expect(favoriteStar).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(favoriteStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
