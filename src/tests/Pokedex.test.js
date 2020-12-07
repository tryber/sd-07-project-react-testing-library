import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testing file Pokedex.js', () => {
  test('if the page contain a h2 with text Encountered pokémons', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const headingPokedex = getAllByRole('heading', { level: 2 });
    expect(headingPokedex[1]).toHaveTextContent('Encountered pokémons');
  });
  test('if the button próximo pokémon works', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getAllByTestId('pokemon-name');
    fireEvent.click(screen.getByTestId('next-pokemon'));
    const nextPokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemonName !== nextPokemon);
    expect(screen.getByText('Próximo pokémon')).toBeInTheDocument();
  });
  test('if the page show only one pokemon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName.length).toBe(1);
  });
  test('if the page have one button of type for each pokemon type', () => {
    renderWithRouter(<App />);
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(typeButtons[0]).toBeInTheDocument();
    expect(typeButtons[1]).toHaveTextContent(/Fire/i);
    expect(typeButtons[2]).toHaveTextContent(/Bug/i);
    expect(typeButtons[3]).toHaveTextContent(/Poison/i);
    expect(typeButtons[4]).toHaveTextContent(/Psychic/i);
    expect(typeButtons[5]).toHaveTextContent(/Normal/i);
    expect(typeButtons[6]).toHaveTextContent(/Dragon/i);
    expect(typeButtons.length).toBe(7);
  });
  test('if the button all works', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('All')).toBeInTheDocument();
    fireEvent.click(screen.getByText('All'));
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
  });
});
