import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Test if a card is rendered with the information of a certain Pokémon.', () => {
  test('The correct name of the Pokémon should be shown on the screen;', () => {
    renderWithRouter(<App />);
    const btnNext = screen.getByText(/Próximo pokémon/i);
    const name = screen.getByTestId('pokemon-name');
    pokemons.forEach((pokemon) => {
      expect(name).toHaveTextContent(pokemon.name);
      fireEvent.click(btnNext);
    });
  });

  test('The correct type of pokémon should be shown on the screen.', () => {
    renderWithRouter(<App />);
    const btnNext = screen.getByText(/Próximo pokémon/i);
    const name = screen.getByTestId('pokemonType');
    pokemons.forEach((pokemon) => {
      expect(name).toHaveTextContent(pokemon.type);
      fireEvent.click(btnNext);
    });
  });

  test('The average weight must be displayed with text in the format', () => {
    renderWithRouter(<App />);
    const btnNext = screen.getByText(/Próximo pokémon/i);
    const name = screen.getByTestId('pokemon-weight');
    pokemons.forEach((pokemon) => {
      expect(name).toHaveTextContent(`Average weight: ${pokemon.averageWeight.value} kg`);
      fireEvent.click(btnNext);
    });
  });

  test('The Pokémon image should be displayed', () => {
    renderWithRouter(<App />);
    const btnNext = screen.getByText(/Próximo pokémon/i);

    pokemons.forEach((pokemon) => {
      const imagePokemon = screen.getByAltText(`${pokemon.name} sprite`);
      expect(imagePokemon).toBeInTheDocument();
      expect(imagePokemon.src).toBe(pokemon.image);
      fireEvent.click(btnNext);
    });
  });
});

test('on Pokédex contains a navigation link to view details', () => {
  renderWithRouter(<App />);
  const btnNext = screen.getByText(/Próximo pokémon/i);
  const details = screen.getByText(/More details/i);
  pokemons.forEach((pokemon) => {
    expect(details.href).toBe(`http://localhost/pokemons/${pokemon.id}`);
    fireEvent.click(btnNext);
  });
});

test('an image with the src attribute containing the /star-icon.svg path', () => {
  renderWithRouter(<App />);
  const details = screen.getByText(/More details/i);
  fireEvent.click(details);
  const btnFavorit = screen.getByText(/Pokémon favoritado?/i);
  fireEvent.click(btnFavorit);
  expect(screen.getByAltText('Pikachu is marked as favorite').src).toBe('http://localhost/star-icon.svg');
});
