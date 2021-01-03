import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

describe('Testando o arquivo PokemonDetails.js', () => {
  it('Testa se as infos detalhadas do Pokémon selecionado são mostradas', () => {
    const { getByText, queryByText, getAllByRole } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { 25: false } }
        pokemons={ pokemons }
        match={ { params: { id: '25' } } }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    const pokemonDetails = getByText('Pikachu Details');
    expect(pokemonDetails).toBeInTheDocument();
    expect(queryByText('More details')).not.toBeInTheDocument();

    const headingLevel = getAllByRole('heading', { level: 2 });
    expect(headingLevel[1]).toHaveTextContent('Summary');

    const resume1 = 'This intelligent Pokémon roasts hard berries with ';
    const resume2 = 'electricity to make them tender enough to eat.';
    const resume = resume1 + resume2;
    const summary = getByText(resume);
    expect(summary).toBeInTheDocument();
  });

  it('Testa se tem uma seção com mapas contendo as localizações do pokémon', () => {
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

  it('Testa se o usuário pode favoritar o pokemon em Detalhes', () => {
    const { getByRole, queryByLabelText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { 25: false } }
        pokemons={ pokemons }
        match={ { params: { id: '25' } } }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    const label = queryByLabelText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();

    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toEqual(false);

    fireEvent.change(checkbox, { target: { checked: true } });
    expect(checkbox.checked).toEqual(true);
  });
});
