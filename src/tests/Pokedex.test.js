import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from '../renderWithRouter';

describe('Testando o arquivo Pokedex.js', () => {
  test('A página contém um heading com o texto "Encountered pokémons."', () => {
    const { getByText } = RenderWithRouter(<App />);
    const heading = getByText(/Encountered pokémons/i);
    expect(heading).toBeInTheDocument();
  });
  test('Ao clicar no botão "Próximo pokémon", aparece o próximo pokemon.', () => {
    const { getByText } = RenderWithRouter(<App />);
    const pokemon0 = getByText(/Pikachu/i);
    expect(pokemon0).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    const pokemon1 = getByText(/Charmander/i);
    expect(pokemon1).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    const pokemon2 = getByText(/Caterpie/i);
    expect(pokemon2).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    const pokemon3 = getByText(/Ekans/i);
    expect(pokemon3).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    const pokemon4 = getByText(/Alakazam/i);
    expect(pokemon4).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    const pokemon5 = getByText(/Mew/i);
    expect(pokemon5).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    const pokemon6 = getByText(/Rapidash/i);
    expect(pokemon6).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    const pokemon7 = getByText(/Snorlax/i);
    expect(pokemon7).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    const pokemon8 = getByText(/Dragonair/i);
    expect(pokemon8).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    const pokemon9 = getByText(/Pikachu/i);
    expect(pokemon9).toBeInTheDocument();
  });
  test('É mostrado apenas um Pokémon por vez.', () => {
    const { getAllByRole } = RenderWithRouter(<App />);
    const pokemonImg = getAllByRole('img');
    expect(pokemonImg.length).toBe(1);
  });
  test('A Pokédex tem os botões de filtro.', () => {
    const { getAllByTestId, getByText } = RenderWithRouter(<App />);
    const buttonAll = getByText(/All/i);
    const typesOfPokemons = 7;
    const buttons = getAllByTestId('pokemon-type-button');
    expect(buttons.length).toBe(typesOfPokemons);
    expect(buttonAll).toBeInTheDocument();
    fireEvent.click(getByText(/Fire/i));
    const pokemon = getByText(/Charmander/i);
    expect(pokemon).toBeInTheDocument();
    expect(buttonAll).toBeInTheDocument();
  });
  test('A Pokédex contém um botão para resetar o filtro.', () => {
    const { getByTestId, getByText } = RenderWithRouter(<App />);

    fireEvent.click(getByText(/Bug/i));
    const pokemonFiltered = getByText(/Caterpie/i);
    expect(pokemonFiltered).toBeInTheDocument();

    const buttonAll = getByTestId('');
    fireEvent.click(buttonAll);
    const pokemon = getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });
  test('O botão de Próximo pokémon deve ser desabilitado, quando só tem 1.', () => {
    const { getByRole, getByText } = RenderWithRouter(<App />);

    fireEvent.click(getByRole('button', { name: /Electric/i }));
    const pokemon = getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();

    const buttonNext = getByRole('button', { name: /Próximo pokémon/i, hidden: true });
    expect(buttonNext).toBeInTheDocument();
  });
});
