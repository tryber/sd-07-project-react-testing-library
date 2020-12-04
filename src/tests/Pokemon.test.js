import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

const pikachuDetails = {
  pokemon: {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo:
      'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      { location: 'Kanto Viridian Forest', map: 'https://c…' },
      { location: 'Kanto Power Plant', map: 'https://cdn.b…' },
    ],
    summary: `This intelligent Pokémon roasts hard berries with electricity to 
    make them tender enough to eat.`,
  },
  isFavorite: true,
  showDetailsLink: true,
};

describe('renders the Pokemon screen', () => {
  it('renders the pokemon info', () => {
    render(<Pokemon { ...pikachuDetails } />, { wrapper: MemoryRouter });

    expect(screen.getByTestId('pokemon-name').textContent).toBe('Pikachu');
    expect(screen.getByTestId('pokemonType').textContent).toBe('Electric');
    const weight = 'Average weight: 6.0 kg';
    expect(screen.getByTestId('pokemon-weight').textContent).toBe(weight);
    const { pokemon: { image } } = pikachuDetails;
    expect(screen.getByAltText('Pikachu sprite').src).toBe(image);
    const idealHref = 'http://localhost/pokemons/25';
    expect(screen.getByText('More details').href).toBe(idealHref);
    expect(screen.getByAltText('Pikachu is marked as favorite')).toBeInTheDocument();
    const imagePath = 'http://localhost/star-icon.svg';
    expect(screen.getByAltText('Pikachu is marked as favorite').src).toBe(imagePath);
  });

  it('render the redirect pokemon route', () => {
    const { history } = renderWithRouter(<Pokemon { ...pikachuDetails } />);
    fireEvent.click(screen.getByText('More details'));
    expect(history.location.pathname).toBe('/pokemons/25');
  });
});
