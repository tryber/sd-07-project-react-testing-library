import { fireEvent } from '@testing-library/react';
import React from 'react';
import PokemonDetails from '../components/PokemonDetails';
import Data from '../data';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const match = {
  path: '/pokemons/:id',
  url: '/pokemons/25',
  isExact: true,
  params: { id: '25' },
};

describe('Requisito 7', () => {
  test('renderiza as informações detalhadas', () => {
    const { queryByText, getByText } = renderWithRouter(
      <PokemonDetails
        pokemons={ Data }
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ match }
        onUpdateFavoritePokemons={ () => true }
      />,
    );
    const name = getByText('Pikachu Details');
    expect(name).toBeInTheDocument();
    expect(name.tagName.toLowerCase()).toBe('h2');
    const linkDetail = queryByText('More details');
    expect(linkDetail).not.toBeInTheDocument();
    const summaryText = getByText(/This intelligent Pokémon/i);
    expect(summaryText).toBeInTheDocument();
    const h2 = getByText('Summary');
    expect(h2.tagName.toLowerCase()).toBe('h2');
  });
  test('renderiza os mapas', async () => {
    const { getByText, findAllByAltText } = renderWithRouter(
      <PokemonDetails
        pokemons={ Data }
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ match }
        onUpdateFavoritePokemons={ () => true }
      />,
    );
    const title = getByText('Game Locations of Pikachu');
    expect(title).toBeInTheDocument();
    expect(title.tagName.toLowerCase()).toBe('h2');
    const location = await findAllByAltText('Pikachu location');
    expect(location[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(location[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(location[0].alt).toBe('Pikachu location');
  });
  test('renderiza a opção de favoritar', () => {
    const { queryByAltText, getByLabelText, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const favoriteButton = getByLabelText('Pokémon favoritado?');
    const x = queryByAltText('Pikachu is marked as favorite');
    expect(x).not.toBeInTheDocument();
    fireEvent.click(favoriteButton);
    const y = queryByAltText('Pikachu is marked as favorite');
    expect(y).toBeInTheDocument();
  });
});
