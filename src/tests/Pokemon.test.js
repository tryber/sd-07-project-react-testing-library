import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Testing Pokemon.js functionality', () => {
  it('Should render the right infos about pokemon', () => {
    const { getByText, queryAllByText, getByAltText } = renderWithRouter(<App />);

    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const pokemonType = queryAllByText(/Electric/i);
    expect(pokemonType[0]).toBeInTheDocument();
    const weight = getByText(/Average weight: 6.0 kg/i);
    expect(weight).toBeInTheDocument();
    const pokemonImg = getByAltText(/pikachu sprite/i);
    expect(pokemonImg).toHaveAttribute('src',
      'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Should have a link to more details of current pokemon', () => {
    const { getByText, history, getByRole, getByAltText } = renderWithRouter(<App />);

    const moreDetails = getByText(/More details/i);
    fireEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const favoriteButton = getByRole('checkbox');
    fireEvent.click(favoriteButton);
    const favoriteLink = getByText('Favorite Pokémons');
    fireEvent.click(favoriteLink);
    const startImg = getByAltText('Pikachu is marked as favorite');
    expect(startImg).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(startImg).toHaveAttribute('src', '/star-icon.svg');
  });

  it('should have a p with attribut data-testid="pokemonType"', () => {
    const { container } = renderWithRouter(<App />);

    const pWithDataId = container.querySelector('[data-testid="pokemonType"]');
    expect(pWithDataId).toBeInTheDocument();
  });
});
