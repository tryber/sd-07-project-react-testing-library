import React from 'react';
import renderWithRouter from './RenderWithRouter';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('testing the Pokedex component', () => {
  beforeEach(() => { renderWithRouter(<App />); })
  test('if cointain a header h2 with the text "Encountered pokemon"', () => {
    const encountered = screen.getByText(/encountered pokémons/i);

    expect(encountered).toBeInTheDocument();
  });

  test('when "Próximo pokémon" clicked show the next pokemon in the list', () => {
    const nextPokemonButton = screen.getByText(/Próximo pokémon/);
    const previousPokemon = screen.getByTestId('pokemon-name').innerHTML;
    fireEvent.click(nextPokemonButton);
    const currentPokemon = screen.getByTestId('pokemon-name').innerHTML;

    expect(previousPokemon).not.toEqual(currentPokemon);
  })

  
})
