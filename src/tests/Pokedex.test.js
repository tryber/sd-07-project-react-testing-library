import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Verificando o Pokedex.js', () => {
  it('Verifica se mostra um h2 com o texto Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const pokeTitle = getByText('Encountered pokémons');
    expect(pokeTitle).toBeInTheDocument();
    expect(pokeTitle).toContainHTML('<h2>');
  });
  it('Verifica se o próximo pokémon é mostrado ao apertar o botão', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const pokeButton = getByText('Próximo pokémon');
    fireEvent.click(pokeButton);
    const pokeName = getByTestId('pokemon-name');
    expect(pokeButton).toHaveTextContent('Próximo pokémon');
    expect(pokeName).toHaveTextContent('Charmander');
  });
  it('Verifica se ao apertar o primeiro pokémon é mostrado ao resetar a Pokedex', () => {
    const { getByText, queryByText, getByTestId } = renderWithRouter(<App />);
    const pokeButton = getByText('Próximo pokémon');
    let pokeName = queryByText('Dragonair');
    while (pokeName === null) {
      pokeName = queryByText('Dragonair');
      fireEvent.click(pokeButton);
    }
    pokeName = getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent('Pikachu');
  });
  it('Verifica se apenas um pokémon é mostrado', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokeNames = getAllByTestId('pokemon-name');
    expect(pokeNames.length).toBe(1);
  });
  it(`Verifica se os botões existem e se ao clicar em um tipo,
   só mostra pokémons daquele tipo`, () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const typeArray = ['Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    typeArray.forEach((type) => {
      const pokeButton = getByText(type);
      const allButton = getByText('All');
      expect(pokeButton).toBeInTheDocument();
      expect(allButton).toBeInTheDocument();
      fireEvent.click(pokeButton);
      const pokeType = getByTestId('pokemonType');
      expect(pokeType).toHaveTextContent(type);
    });
  });
  it('Verifica se o fitro é resetado ao apertar o All', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const nextPokemon = getByText('Próximo pokémon');
    let pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent('Electric');
    fireEvent.click(nextPokemon);
    pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent('Fire');
  });
  it('Verifica se houver apenas um pokémon no filtro, o botão não funciona', () => {
    const { getByText } = renderWithRouter(<App />);
    const dragonButton = getByText('Dragon');
    fireEvent.click(dragonButton);
    const nextPokemon = getByText('Próximo pokémon');
    expect(nextPokemon).toBeDisabled();
  });
});
