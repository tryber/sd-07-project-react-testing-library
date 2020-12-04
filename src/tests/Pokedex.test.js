import { cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

afterEach(cleanup);

describe('Testando o arquivo Pokedex.js', () => {
  test('Se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Encountered pokémons/i);
    expect(heading).toBeInTheDocument();
  });

  test('É exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    const nextPokemonButton = getByText(/Próximo pokémon/i);
    const pokemon = getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
    fireEvent.click(nextPokemonButton);
    expect(pokemon.length).toBe(1);
  });

  test('Se a Pokédex tem os botões de filtro', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const filterButtons = getAllByTestId('pokemon-type-button');
    filterButtons.forEach((button) => {
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
      const pokemon = getByTestId('pokemonType');
      expect(pokemon.innerHTML).toBe(button.innerHTML);
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonAll = getByText('All');
    fireEvent.click(buttonAll);
    const firstPokemon = getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });
});
