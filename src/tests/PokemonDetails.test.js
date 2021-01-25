import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pokemon = pokemons[0];

describe('Pokemon Details Tests', () => {
  it('Tests if the pokemon details are shown', () => {
    const {
      getByText,
      getByRole,
      history,
    } = renderWithRouter(<App />);
    history.push('/');
    const pokedetails = getByText(/More details/i);
    const detailsTitle = `${pokemon.name} Details`;
    const pokesummary = pokemon.summary;
    history.push('/pokemons/25');
    const thesummary = getByText(pokesummary);
    const headingpoke = getByRole('heading', { name: detailsTitle });
    const summary = getByRole('heading', { name: /Summary/i });
    expect(headingpoke).toBeInTheDocument();
    expect(pokedetails).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(thesummary).toBeInTheDocument();
  });

  it('Tests if theres a section with the pokemon location maps', () => {
    const {
      getAllByAltText,
      getByRole,
      history,
      getByText,
    } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const mockedheading = `Game Locations of ${pokemon.name}`;
    const mockedlocation = [pokemon.foundAt[0].map, pokemon.foundAt[1].map];
    const pokeheading = getByRole('heading', { name: mockedheading });
    const pokemonlocations = getAllByAltText(/Pikachu location/i);
    const Locations0 = getByText(pokemon.foundAt[0].location);
    const Locations1 = getByText(pokemon.foundAt[1].location);
    expect(pokeheading).toBeInTheDocument();
    expect((pokemonlocations.length).toString()).toBe('2');
    expect(pokemonlocations[0].src).toBe(mockedlocation[0]);
    expect(pokemonlocations[0].alt).toBe('Pikachu location');
    expect(pokemonlocations[1].src).toBe(mockedlocation[1]);
    expect(pokemonlocations[1].alt).toBe('Pikachu location');
    expect(Locations0).toBeInTheDocument();
    expect(Locations1).toBeInTheDocument();
  });

  it('Tests if its possible to favorite a pokemon from details page', () => {
    const {
      getByLabelText,
      getByAltText,
      history,
    } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const details = getByLabelText(/Pokémon favoritado/i);
    expect(details).toBeInTheDocument();
    fireEvent.click(details);
    const star = getByAltText(/Pikachu is marked as favorite/i);
    expect(star).toBeInTheDocument();
    fireEvent.click(details);
    expect(star).not.toBeInTheDocument();
    expect(details.type).toBe('checkbox');
  });
});
