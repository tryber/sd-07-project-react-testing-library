import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Testing Pokemon.js', () => {
  it('Tests render a specific Pokemon info', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    expect(getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(getByTestId('pokemonType')).toHaveTextContent('Electric');
    expect(getByTestId('pokemon-weight')).toHaveTextContent('Average weight: 6.0 kg');
    expect(getByAltText('Pikachu sprite'))
      .toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Tests if a Pokemon Card contains a nav link to show details', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('More details')).toHaveAttribute('href', '/pokemons/25');
  });

  it('Tests if it redirects when link is clicked', () => {
    const { getByText } = renderWithRouter(<App />);
    const btnMoreDetails = getByText(/More details/i);
    fireEvent.click(btnMoreDetails);
    expect(getByText(/Pikachu Details/i)).toBeInTheDocument();
  });

  it('Tests if the URL shown in browser changes to Pokemons ID', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const btnMoreDetails = getByText(/More details/i);
    fireEvent.click(btnMoreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Tests if it is a Star Icon in a favorite Pokemon', () => {
    const { getByText, getByLabelText, getByAltText } = renderWithRouter(<App />);
    const moreDetailsBtn = getByText(/More details/i);
    fireEvent.click(moreDetailsBtn);
    const favoriteBtn = getByLabelText('Pokémon favoritado?');
    fireEvent.click(favoriteBtn);
    expect(getByAltText('Pikachu is marked as favorite'))
      .toHaveAttribute('src', '/star-icon.svg');
  });
});
