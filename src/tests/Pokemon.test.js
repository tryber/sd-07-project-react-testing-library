import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Tests if a card with pokémon info is rendered', () => {
  it('should display the name of the selected pokémon', () => {
    // Fonte: Estudante Ana Karine
    // https://github.com/tryber/sd-07-project-react-testing-library/pull/91/files
    const selectedPokemon = pokemons[4];
    const { getByText } = renderWithRouter(<Pokemon
      pokemon={ selectedPokemon }
      isFavorite={ false }
    />);
    const pokemonName = getByText(selectedPokemon.name);
    const expectedPokemonName = 'Alakazam';
    expect(pokemonName.textContent).toBe(expectedPokemonName);
  });
  it('should display the weight of the pokemon', () => {
    const selectedPokemon = pokemons[4];
    const { getByText } = renderWithRouter(<Pokemon
      pokemon={ selectedPokemon }
      isFavorite={ false }
    />);
    const avgWeightValue = selectedPokemon.averageWeight.value;
    const avgWeightUnit = selectedPokemon.averageWeight.measurementUnit;
    const weight = getByText(`Average weight: ${avgWeightValue} ${avgWeightUnit}`);
    const expectedWeight = 'Average weight: 48.0 kg';
    expect(weight.textContent).toBe(expectedWeight);
  });
  it('should display an image correctly', () => {
    const selectedPokemon = pokemons[4];
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ selectedPokemon }
      isFavorite={ false }
    />);
    const pokemonImage = selectedPokemon.image;
    const imageUrl = 'https://cdn.bulbagarden.net/upload/8/88/Spr_5b_065_m.png';
    const actualAltText = (`${selectedPokemon.name} sprite`);
    const expectedAltText = getByAltText('Alakazam sprite');
    expect(pokemonImage).toBe(imageUrl);
    expect(expectedAltText.alt).toBe(actualAltText);
    expect(expectedAltText.src).toBe(imageUrl);
  });
  it('should exist a star icon in favorite pokémons', () => {
    const selectedPokemon = pokemons[4];
    const isFavoriteValue = true;
    const { getByAltText } = renderWithRouter(<Pokemon
      pokemon={ selectedPokemon }
      isFavorite={ isFavoriteValue }
    />);
    const favoriteStarIcon = getByAltText('Alakazam is marked as favorite');
    const urlPath = 'http://localhost/star-icon.svg';
    expect(favoriteStarIcon.src).toBe(urlPath);
    expect(favoriteStarIcon).toBeInTheDocument();
  });
});

describe('Tests navigation for Pokemon component', () => {
  it('contains a navigation link for details', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
});
