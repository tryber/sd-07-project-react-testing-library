import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

describe('Testando o arquivo PokemonDetails.js', () => {
  it('testa se as informações são do pokemon selecionado', () => {
    const part1 = 'This intelligent Pokémon roasts hard berries';
    const part2 = 'with electricity to make them tender enough to eat.';
    const text = `${part1} ${part2}`;
    const { getByText, queryByText, getAllByRole } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { 25: false } }
        pokemons={ pokemons }
        match={ { params: { id: '25' } } }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const pokemonsDetails = getByText('Pikachu Details');
    expect(pokemonsDetails).toBeInTheDocument();
    expect(queryByText('More details')).not.toBeInTheDocument();

    const headingLevel = getAllByRole('heading', { level: 2 });
    expect(headingLevel[1]).toHaveTextContent('Summary');

    const pokemonSummary = getByText(text);
    expect(pokemonSummary).toBeInTheDocument();
  });

  it('testa se existe uma seção com os mapas com as localizações do poketon', () => {
    const { getAllByAltText, getAllByRole } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { 25: false } }
        pokemons={ pokemons }
        match={ { params: { id: '25' } } }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    const heading = getAllByRole('heading', { level: 2 });
    expect(heading[2]).toHaveTextContent('Game Locations of Pikachu');

    const locationName = getAllByAltText('Pikachu location');
    expect(locationName[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationName[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('testa se o usuário pode favoritar o pokemon', () => {
    const { getByRole, queryByLabelText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { 25: false } }
        pokemons={ pokemons }
        match={ { params: { id: '25' } } }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    const labelCheckbox = queryByLabelText('Pokémon favoritado?');
    expect(labelCheckbox).toBeInTheDocument();

    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toEqual(false);

    fireEvent.change(checkbox, { target: { checked: true } });
    expect(checkbox.checked).toEqual(true);
  });
});
