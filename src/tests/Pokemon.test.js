import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testing file Pokemon.js', () => {
  test('if the card have all informations correctly', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemonType');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const moreDetaisButton = screen.getByText('More details');
    const pokemonImg = screen.getByAltText('Pikachu sprite');
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(moreDetaisButton).toHaveAttribute('href', '/pokemons/25');
    expect(pokemonImg).toHaveAttribute(
      'src',
      'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });
  test('if the link Pokémons Favoritados render pathname /favorites', () => {
    const { getByAltText, getByText, getByRole, history } = renderWithRouter(
      <App />,
    );
    fireEvent.click(getByText(/More details/i));
    const { location } = history;
    const { pathname } = location;
    expect(pathname).toBe('/pokemons/25');
    fireEvent.click(getByRole('checkbox'));
    const star = getByAltText(/Pikachu is marked as favorite/i);
    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
