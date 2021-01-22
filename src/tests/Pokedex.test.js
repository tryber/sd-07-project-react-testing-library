import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
// import Pokedex from '../components/Pokedex';
afterEach(cleanup);
describe('Testando o arquivo `Pokedex.js`', () => {
  it('Verifica se há um título com o texto `Encountered pokémons`', () => {
    const { getByText } = renderWithRouter(<App />);
    const title = getByText('Encountered pokémons');
    expect(title).toBeInTheDocument();
  });

  it('Verifica se muda o pokémon ao clicar no botão `Próximo pokémon`', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const pkmn1 = getByText('Pikachu');
    expect(pkmn1).toBeInTheDocument();
    const button = getByTestId('next-pokemon');
    fireEvent.click(button);
    const pkmn2 = getByText('Charmander');
    expect(pkmn2).toBeInTheDocument();
    fireEvent.click(button);
    const pkmn3 = getByText('Caterpie');
    expect(pkmn3).toBeInTheDocument();
    fireEvent.click(button);
    const pkmn4 = getByText('Ekans');
    expect(pkmn4).toBeInTheDocument();
    fireEvent.click(button);
    const pkmn5 = getByText('Alakazam');
    expect(pkmn5).toBeInTheDocument();
    fireEvent.click(button);
    const pkmn6 = getByText('Mew');
    expect(pkmn6).toBeInTheDocument();
    fireEvent.click(button);
    const pkmn7 = getByText('Rapidash');
    expect(pkmn7).toBeInTheDocument();
    fireEvent.click(button);
    const pkmn8 = getByText('Snorlax');
    expect(pkmn8).toBeInTheDocument();
    fireEvent.click(button);
    const pkmn9 = getByText('Dragonair');
    expect(pkmn9).toBeInTheDocument();
    fireEvent.click(button);
    const pkmn10 = getByText('Pikachu');
    expect(pkmn10).toBeInTheDocument();
    const buttonValue = getByText('Próximo pokémon');
    expect(buttonValue).toBeInTheDocument();
  });

  it('Verifica se epokemon-namexibe apenas um pokémon', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemon = getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  it('verifica se há botões com os filtros por tipo de pokémon', () => {
    const { getAllByTestId, getByText } = renderWithRouter(<App />);
    const buttonAllTypes = getByText('All');
    expect(buttonAllTypes).toBeInTheDocument();
    const pokemonTypes = 7;
    const typeButtons = getAllByTestId('pokemon-type-button');
    expect(typeButtons.length).toBe(pokemonTypes);
    const normalTypeButton = getByText('Normal');
    expect(normalTypeButton).toBeInTheDocument();
    fireEvent.click(normalTypeButton);
    const pokemon = getByText('Snorlax');
    expect(pokemon).toBeInTheDocument();
  });

  it('Verifica se há um botão que reseta o tipo dos pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const fireTypeButton = getByText('Fire');
    fireEvent.click(fireTypeButton);
    const pokemon1 = getByText('Charmander');
    expect(pokemon1).toBeInTheDocument();
    const buttonAll = getByText('All');
    fireEvent.click(buttonAll);
    const pokemon2 = getByText('Pikachu');
    expect(pokemon2).toBeInTheDocument();
  });
});
