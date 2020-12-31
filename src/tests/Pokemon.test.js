import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testing Pokemon.js', () => {
  test('renders pokemon name correctly', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const pokemonNameId = getByTestId('pokemon-name');

    expect(pokemonNameId.textContent).toBe('Pikachu');
  });

  test('renders pokemon type correctly', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const pokemonTypeId = getByTestId('pokemonType');

    expect(pokemonTypeId.textContent).toBe('Electric');
  });

  test('renders pokemon weight correctly', () => {
    const { getByTestId } = renderWithRouter(<App />);

    const pokemonWeightId = getByTestId('pokemon-weight');

    expect(pokemonWeightId.textContent).toBe('Average weight: 6.0 kg');
  });

  test('renders pokemon img correctly', () => {
    const { getByRole } = renderWithRouter(<App />);

    const pokemonImg = getByRole('img');
    const pokemonSrc = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const pokemonAlt = 'Pikachu sprite';

    expect(pokemonImg.src).toBe(pokemonSrc);
    expect(pokemonImg.alt).toBe(pokemonAlt);
  });

  test('renders pokemon details link correctly', () => {
    const { getByText } = renderWithRouter(<App />);

    const pokemonDetailsLink = getByText('More details');
    expect(pokemonDetailsLink.tagName).toBe('A');
    expect(pokemonDetailsLink.pathname).toBe('/pokemons/25');
  });

  test('renders pokemon details by clicking on the link, with the right URL', () => {
    const { getByText, history } = renderWithRouter(<App />);

    fireEvent.click(getByText('More details'));

    expect(getByText('Pikachu Details')).toBeInTheDocument();
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('favorite pokemons has a star icon', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);

    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Pokémon favoritado?'));

    const starIcon = getByAltText('Pikachu is marked as favorite');
    const src = 'http://localhost/star-icon.svg';

    expect(starIcon.src).toBe(src);
  });
});
