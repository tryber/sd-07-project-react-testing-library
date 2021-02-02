import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Testes do arquivo PokemonDetails.js', () => {
  afterEach(cleanup);
  test('testes', () => {
    const { getByText, queryByText, getByLabelText, getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const moreDetails = getByText('More details');
    expect(moreDetails).toBeInTheDocument();

    fireEvent.click(moreDetails);

    const pokemonDetails = getByText('Pikachu Details');
    expect(pokemonDetails).toBeInTheDocument();

    const link = queryByText('More details');
    expect(link).toBeNull();

    const heading = document.querySelectorAll('h2');
    expect(heading[1].innerHTML).toBe(' Summary ');

    const paragraph = document.querySelector('p');
    expect(paragraph[0]).toBe(`This intelligent Pokémon roasts hard berries with
electricity to make them tender enough to eat.`);

    const locationHeading = document.querySelectorAll('h2');
    expect(locationHeading[2].innerHTML).toBe('Game Locations of Pikachu');

    const favorite = getByLabelText('Pokémon favoritado?');
    expect(favorite).toBeInTheDocument();

    fireEvent.click(favorite);

    const icon = getAllByRole('img');
    expect(icon[1].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(icon[1].alt).toBe('Pikachu location');
  });
});
