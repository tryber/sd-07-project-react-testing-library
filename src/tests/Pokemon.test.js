import React from 'react';
import { fireEvent } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('testing Pokemon component', () => {
  test('if the correct pokemon name is shown', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    const nameID = getByTestId('pokemon-name').innerHTML;
    const typeID = getByTestId('pokemonType').innerHTML;
    const weightID = getByTestId('pokemon-weight').innerHTML;
    const image = getByRole('img');

    expect(nameID).toBe('Pikachu');
    expect(typeID).toBe('Electric');
    expect(weightID).toBe('Average weight: 6.0 kg');
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('if leads to datail page with correct id', () => {
    const { getByText } = renderWithRouter(<App />);
    const details = getByText(/more details/i);
    expect(details.href).toBe('http://localhost/pokemons/25');
  });

  test('if the has the corrcet datails link', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const details = getByText(/More details/i);
    expect(details).toBeInTheDocument();

    fireEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  test('if it has the star icon', () => {
    const { getByText, getByAltText, getByLabelText } = renderWithRouter(<App />);
    const details = getByText(/More details/i);
    expect(details).toBeInTheDocument();

    fireEvent.click(details);

    const favoriteIcon = getByLabelText('Pokémon favoritado?');
    fireEvent.click(favoriteIcon);

    const markedAsFav = getByAltText('Pikachu is marked as favorite');
    expect(markedAsFav).toBeInTheDocument();

    expect(markedAsFav).toHaveAttribute('src', '/star-icon.svg');
  });
});
