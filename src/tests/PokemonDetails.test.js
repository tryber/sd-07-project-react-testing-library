import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testando o arquivo PokemonDetails.js', () => {
  it('Teste se as informações detalhadas do Pokémon são mostradas na tela', () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ {} }
        match={ { params: { id: 25 } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const heading = screen.getByRole('heading', {
      name: 'Summary',
    });
    const phrase1 = 'This intelligent Pokémon roasts ';
    const phrase2 = 'hard berries with electricity to make them tender enough to eat.';
    const moreDetails = screen.queryByText('More Details');
    const paragraphDetails = screen.getByText(phrase1 + phrase2);
    const pikachuDetails = screen.getByText('Pikachu Details');
    expect(pikachuDetails).toBeInTheDocument();
    expect(paragraphDetails).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
  });
  it(`Teste se existe na página
  uma seção com os mapas contendo as localizações do pokémon`, () => {
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ {} }
        match={ { params: { id: 25 } } }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    const heading = screen.getByRole('heading', {
      name: 'Game Locations of Pikachu',
    });
    const two = 2;
    const locations = screen.getAllByAltText('Pikachu location');
    expect(heading).toBeInTheDocument();
    expect(locations.length).toBe(two);
    expect(locations[0].src).toBe(
      'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(locations[1].src).toBe(
      'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
  });
  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App pokemons={ pokemons } />);
    const btnDetails = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(btnDetails);
    const favSelector = screen.getByText(/pokémon favoritado?/i);
    expect(favSelector).toBeInTheDocument();
    fireEvent.click(favSelector);
    const favIcon = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favIcon).toBeInTheDocument();
    fireEvent.click(favSelector);
    expect(favIcon).not.toBeInTheDocument();
  });
});
