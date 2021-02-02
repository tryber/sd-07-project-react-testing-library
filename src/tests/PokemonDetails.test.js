import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

describe('Testando o arquivo PokemonDetails.js', () => {
  it('se as infos detalhadas do Pokémon selecionado são mostradas', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { 25: false } }
        pokemons={ pokemons }
        match={ { params: { id: '25' } } }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
    expect(screen.queryByText('More details')).not.toBeInTheDocument();

    expect(screen.getAllByRole('heading', { level: 2 })[1])
      .toHaveTextContent('Summary');

    const text1 = 'This intelligent Pokémon roasts hard berries with ';
    const text2 = 'electricity to make them tender enough to eat.';
    const text = text1 + text2;
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('se tem uma seção com mapas contendo as localizações do pokémon', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { 25: false } }
        pokemons={ pokemons }
        match={ { params: { id: '25' } } }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    expect(screen.getAllByRole('heading', { level: 2 })[2])
      .toHaveTextContent('Game Locations of Pikachu');

    const location = screen.getAllByAltText('Pikachu location');
    expect(location[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(location[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('se o usuário pode favoritar o pokemon em Detalhes', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ { 25: false } }
        pokemons={ pokemons }
        match={ { params: { id: '25' } } }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );

    expect(screen.queryByLabelText('Pokémon favoritado?')).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.checked).toEqual(false);
    expect(checkbox).toBeInTheDocument();

    fireEvent.change(checkbox, { target: { checked: true } });
    expect(checkbox.checked).toEqual(true);
  });
});
