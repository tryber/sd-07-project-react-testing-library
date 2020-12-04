import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Details from '../components/PokemonDetails';
import data from '../data';

describe('Testando o arquivo PokemonDetails.js', () => {
  const pokeFav = {
    4: false,
    10: false,
    23: false,
    25: true,
    65: false,
    78: false,
    143: false,
    148: true,
    151: false,
  };

  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    const { getByText, queryByText, getByRole, getByTestId } = renderWithRouter(
      <Details
        isPokemonFavoriteById={ pokeFav }
        pokemons={ data }
        match={ { params: { id: 25 } } }
        onUpdateFavoritePokemons={ () => { } }
      />,
    );

    // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;
    const pokeName = getByText('Pikachu');
    expect(pokeName).toBeInTheDocument();

    // Não deve existir o link de navegação para os detalhes do Pokémon selecionado.
    const btnDetail = queryByText('More details');
    expect(btnDetail).toBe(null);

    // A seção de detalhes deve conter um heading h2 com o texto Summary.
    const title = getByRole('heading', { name: /Summary/i });
    expect(title.innerHTML).toBe('Summary');

    // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
    const text = getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat./i);
    expect(text).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações do pokémon', () => {
    const { getByText, getAllByRole, getByRole } = renderWithRouter(
      <Details
        isPokemonFavoriteById={ pokeFav }
        pokemons={ data }
        match={ { params: { id: 25 } } }
        onUpdateFavoritePokemons={ () => { } }
      />,
    );

    // Deverá conter, na seção de detalhes, um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido.
    const title = getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(title.innerHTML).toBe('Game Locations of Pikachu');

    // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;
    const imgs = getAllByRole('img', { name: /pikachu location/i });
    const dois = 2;
    expect(imgs.length).toBe(dois);

    // Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização.
    const text1 = getByText('Kanto Viridian Forest');
    const text2 = getByText('Kanto Power Plant');
    expect(text1).toBeInTheDocument();
    expect(text2).toBeInTheDocument();

    // A imagem da localização deve ter um atributo src com a URL da localização.
    expect(imgs[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgs[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    // A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon.
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    // A página deve exibir um checkbox que permite favoritar o Pokémon.

    // Cliques alternados no checkbox devem adicionar e remover o Pokémon da lista de favoritos.

    // O label do checkbox deve conter o texto Pokémon favoritado?.
  });

  it('Matando todos os mutantes', () => {
    const { getByText } = renderWithRouter(
      <Details
        isPokemonFavoriteById={ pokeFav }
        pokemons={ data }
        match={ { params: { id: 25 } } }
        onUpdateFavoritePokemons={ () => { } }
      />,
    );

    const pokeDetail = getByText('Pikachu Details');
    expect(pokeDetail.innerHTML).toBe('Pikachu Details');

    const fav = getByText(/Pokémon favoritado/);
    expect(fav).toBeInTheDocument();
  });
});
