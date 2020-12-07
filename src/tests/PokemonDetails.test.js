import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import App from '../App';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

afterEach(cleanup);

const isPokemonFavoriteById = {
  4: true,
  10: true,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe(`Teste se as informações detalhadas do Pokémon selecionado 
são mostradas na tela.`, () => {
  it(`A página deve conter um texto <name> Details, onde <name> é o 
  nome do Pokémon;`, () => {
    const {
      // getByRole,
      // queryByRole,
      getByText,
      // history,
    } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ isPokemonFavoriteById }
      pokemons={ pokemons }
      match={ { params: { id: '25' } } }
      onUpdateFavoritePokemons={ () => {} }
    />);
    const name = getByText(/Pikachu Details/);
    expect(name).toBeInTheDocument();
    const summary = getByText(/Summary/);
    expect(summary.tagName).toBe('H2');
    const details = getByText(/This intelligent Pokémon roasts hard berries with ele/);
    expect(details).toBeInTheDocument();
  });
});

describe(`Teste se existe na página uma seção com os mapas contendo as localizações do 
pokémon`, () => {
  it(`Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of 
  <name>; onde <name> é o nome do Pokémon exibido.`, () => {
    const {
      // getByRole,
      // queryByRole,
      getByText,
      // history,
    } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ isPokemonFavoriteById }
      pokemons={ pokemons }
      match={ { params: { id: '25' } } }
      onUpdateFavoritePokemons={ () => {} }
    />);
    const summary = getByText(/Game Locations of Pikachu/);
    expect(summary.tagName).toBe('H2');
  });

  it(`Todas as localizações do Pokémon devem ser mostradas 
  na seção de detalhes;`, () => {
    const { getAllByAltText, getByText } = renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ isPokemonFavoriteById }
      pokemons={ pokemons }
      match={ { params: { id: '25' } } }
      onUpdateFavoritePokemons={ () => {} }
    />);
    const location1 = getAllByAltText(/Pikachu location/);
    expect(location1[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    const location2 = getAllByAltText(/Pikachu location/);
    expect(location2[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    const textLocation1 = getByText(/Kanto Viridian Forest/);
    expect(textLocation1).toBeInTheDocument();
    const textLocation2 = getByText(/Kanto Power Plant/);
    expect(textLocation2).toBeInTheDocument();
  });
});

describe(`Teste se o usuário pode favoritar um pokémon através da 
página de detalhes.`, () => {
  it(`A página deve exibir um checkbox que permite favoritar o 
  Pokémon;`, () => {
    const {
      getByText,
      getAllByAltText,
      queryByAltText,
    } = renderWithRouter(<App />);

    fireEvent.click(getByText(/More details/i));

    const favorite = getByText(/Pokémon favoritado/);
    expect(favorite).toBeInTheDocument();
    const star2 = queryByAltText(/Pikachu is marked as favorite/);
    expect(star2).toBe(null);
    fireEvent.click(favorite);
    const star = getAllByAltText(/Pikachu is marked as favorite/);
    expect(star[0].src).toBe('http://localhost/star-icon.svg');


  });
});
