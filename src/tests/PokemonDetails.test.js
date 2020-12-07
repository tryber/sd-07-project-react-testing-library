import React from 'react';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

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
});
