import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

test('Teste se a página contém um heading h2 com o texto `Encountered pokémons`', () => {
  const { getByRole } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
  );
  expect(getByRole('heading')).toHaveTextContent(/Encountered pokémons/i);
  expect(getByRole('heading').tagName).toBe('H2');
});

describe('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado.',
  () => {
    it('O botão deve conter o texto Próximo pokémon;', () => {
      const { getByText } = renderWithRouter(
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
      );
      expect(getByText(/Próximo pokémon/i)).toBeInTheDocument();
      expect(getByText(/Próximo pokémon/i).tagName).toBe('BUTTON');
    });
    it('Os Pokémons da lista devem ser mostrados, um a um, ao clicar o botão;', () => {
      const { getByText } = renderWithRouter(
        <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
      );
      pokemons.forEach((pokemon, index) => {
        // Pokémon atual:
        const namePokemon = getByText(pokemon.name);
        expect(namePokemon).toBeInTheDocument();

        // Simula o evento de click no botão:
        const btnNext = getByText(/Próximo pokémon/i);
        fireEvent.click(btnNext);

        // Calcula o índice do próximo Pokémon a ser exibido em tela:
        const sizePokemons = pokemons.length;
        const indexNextPokemon = (index === sizePokemons - 1)
          ? ((index + 1) - sizePokemons) // volta ao primeiro da lista
          : (index + 1); // segue para o próximo da lista

        // Próximo Pokémon:
        const nameNextPokemon = getByText(pokemons[indexNextPokemon].name);
        expect(nameNextPokemon).toBeInTheDocument();
      });
      // esse teste foi extraído da página de Ana karine:
      // https://github.com/tryber/sd-07-project-react-testing-library/pull/91/files
    });
  });
