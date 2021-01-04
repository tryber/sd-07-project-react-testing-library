import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import RenderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Requirement 6', () => {
  const pikachu = pokemons[0];
  it('Should displays pokemon info', () => {
    RenderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite={ false } />,
    );
    expect(screen.getByTestId('pokemon-name').textContent).toBe('Pikachu');
    expect(screen.getByTestId('pokemonType').textContent).toBe('Electric');
    const weight = 'Average weight: 6.0 kg';
    expect(screen.getByTestId('pokemon-weight').textContent).toBe(weight);
    const { image } = pikachu;
    expect(screen.getByAltText('Pikachu sprite').src).toBe(image);
  });

  it('If the Pokémon card contains a link to view details of this Pokémon', () => {
    RenderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite={ false } />,
    );
    const linkHref = 'http://localhost/pokemons/25';
    expect(screen.getByText('More details').href).toBe(linkHref);
  });

  it('If click on the Pokémon link, will be redirected to the details page.', () => {
    const { getByRole } = RenderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite={ false } />,
    );
    const link = getByRole('link', { Name: /More details/i });
    expect(link.href).toBe('http://localhost/pokemons/25');
  });
  it('If the URL displays / pokemon / <id>, with the details of the Pokémon.', () => {
    const { getByText, history } = RenderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite={ false } />,
    );
    fireEvent.click(getByText(/More details/i));
    const { pathname } = history.location;
    expect(pathname).toBe('pokemons/25');
  });
  it('If there is a star icon on favorite Pokémon.', () => {
    const { getByAltText } = RenderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite />,
    );
    const image = getByAltText(/Pikachu is marked as favorite/i);
    expect(image).toHaveAttribute('src', '/star-icon.svg');
  });
});
