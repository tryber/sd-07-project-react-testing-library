import React from 'react';
import { fireEvent } from '@testing-library/react';
import PokemonDetails from '../components/PokemonDetails';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import {
  readFavoritePokemonIds,
} from '../services/pokedexService';

describe('Testando o arquivo PokemonDetails.js', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas', () => {
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});
    const { getByText, queryByRole } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavorite }
        match={ { params: { id: '25' } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    expect(getByText('Pikachu Details')).toBeInTheDocument();
    expect(queryByRole('link', { name: /details/i })).not.toBeInTheDocument();
    const heading = queryByRole('heading', { name: /Summary/i });
    expect(heading).toBeInTheDocument();
    const paragraph = /This intelligent Pokémon roasts hard berries with electricity/i;
    expect(getByText(paragraph)).toBeInTheDocument();
  });
  it('Teste se existe na página uma seção com os mapas contendo as localizações', () => {
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});
    const { getByText, queryByRole, getAllByAltText } = renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavorite }
        match={ { params: { id: '25' } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const heading = queryByRole('heading', { name: /Game Locations of Pikachu/i });
    expect(heading).toBeInTheDocument();
    const location1 = getByText('Kanto Viridian Forest');
    const location2 = getByText('Kanto Power Plant');
    expect(location1).toBeInTheDocument();
    expect(location2).toBeInTheDocument();
    const imgLocations = getAllByAltText('Pikachu location');
    expect(imgLocations[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgLocations[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    const checkbox = getByLabelText(/Pokémon favoritado/i);
    expect(checkbox).toBeInTheDocument();
    fireEvent.click((checkbox));
  });
});
