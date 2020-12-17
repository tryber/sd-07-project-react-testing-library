import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

describe('Testando o arquivo PokemonDetails.js', () => {
  it('as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { getByText, queryByText, getByRole } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { 25: false } }
        match={ { params: { id: '25' } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    expect(getByText('Pikachu Details')).toBeInTheDocument();
    expect(queryByText('More details')).not.toBeInTheDocument();

    expect(getByRole('heading', { name: 'Summary' })).toBeInTheDocument();
  });

  it('existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { getAllByAltText, getByRole } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { 25: false } }
        match={ { params: { id: '25' } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    expect(getByRole('heading', { name: 'Game Locations of Pikachu' }))
      .toHaveTextContent('Game Locations of Pikachu');

    const location = getAllByAltText('Pikachu location');
    expect(location[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(location[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { getByRole, queryByLabelText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { 25: false } }
        match={ { params: { id: '25' } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    expect(queryByLabelText('Pokémon favoritado?')).toBeInTheDocument();

    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    fireEvent.change(checkbox, { target: { checked: true } });
    expect(checkbox).toBeChecked();
  });
});
