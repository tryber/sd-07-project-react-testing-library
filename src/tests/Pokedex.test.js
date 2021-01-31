import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Verificando o Pokedex.js', () => {
  it('contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const pokeTitle = getByText('Encountered pokémons');
    expect(pokeTitle).toBeInTheDocument();
    expect(pokeTitle).toContainHTML('<h2>');
  });
  it('exibe o próximo Pokémon da lista quando o botão Próximo pokémon é clicado.', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const pokeButton = getByText('Próximo pokémon');
    fireEvent.click(pokeButton);
    const pokeName = getByTestId('pokemon-name');
    expect(pokeButton).toHaveTextContent('Próximo pokémon');
    expect(pokeName).toHaveTextContent('Charmander');
  });
  it('mostra apenas um Pokémon por vez', () => {
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
  it('circula somente pelos pokémons daquele tipo', () => {
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
  it('contém um botão para resetar o filtro', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const nextPokemon = getByText('Próximo pokémon');
    let pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent('Electric');
    fireEvent.click(nextPokemon);
    pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent('Fire');
  });
  it('desabilitao a lista filtrada de Pokémons se tiver um só pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const dragonButton = getByText('Dragon');
    fireEvent.click(dragonButton);
    const nextPokemon = getByText('Próximo pokémon');
    expect(nextPokemon).toBeDisabled();
  });
});
