import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

describe('Teste do componente PokemonDetails', () => {
  test('Teste de informações detalhadas do pokemon', () => {
    const { getByText, queryByRole, getByRole } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ { 25: true } }
      match={ { params: { id: '25' } } }
      onUpdateFavoritePokemons={ () => {} }
      pokemons={ pokemons }
    />);

    const pokeDetail = getByText(/Pikachu Details/i);
    expect(pokeDetail).toBeInTheDocument();

    const detailLink = queryByRole('link', { name: 'More details' });
    expect(detailLink).toBeNull();

    const heading = getByRole('heading', { name: 'Summary', level: 2 });
    expect(heading).toBeInTheDocument();

    const paragraphDetail = getByText(/This intelligent Pokémon roasts hard/i);
    expect(paragraphDetail).toBeInTheDocument();
  });

  test('Teste em seção de mapas e localização do pokemon', () => {
    const { getByRole, getAllByRole } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ { 25: true } }
      match={ { params: { id: '25' } } }
      onUpdateFavoritePokemons={ () => {} }
      pokemons={ pokemons }
    />);

    const heading = getByRole('heading', {
      name: 'Game Locations of Pikachu',
      level: 2,
    });
    expect(heading).toBeInTheDocument();

    const local = getAllByRole('img', { name: 'Pikachu location' });
    const dois = 2;
    expect(local.length).toBe(dois);
    expect(local[0].src)
      .toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(local[1].src)
      .toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Teste de pokemon favoritado', () => {
    const { getByLabelText } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ { 25: true } }
      match={ { params: { id: '25' } } }
      onUpdateFavoritePokemons={ () => {} }
      pokemons={ pokemons }
    />);

    const favoritePoke = getByLabelText('Pokémon favoritado?');
    expect(favoritePoke).toBeInTheDocument();
    expect(favoritePoke.checked).toBe(true);

    fireEvent.change(favoritePoke, { target: { checked: false } });
    expect(favoritePoke.checked).toBe(false);
  });
});
