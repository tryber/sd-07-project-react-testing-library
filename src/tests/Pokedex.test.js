import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

test('Teste se a página contém um heading h2 com o texto `Encountered pokémons`', () => {
  const { container } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
  );
  container.querySelector('h2');
  expect(container.querySelector('h2')).toHaveTextContent('Encountered pokémons');
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
    it('Ao clicar no botão deve ir para o próximo poke e no final, voltar ao 1º;', () => {
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

describe('Teste se é mostrado apenas um Pokémon por vez.', () => {
  const { getByRole } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
  );
  expect(getByRole('img')).toBeInTheDocument();
});

describe('Teste se a Pokédex tem os botões de filtro.', () => {
  it('Ao clicar num botao de tipo, mostra só esse tipo'
  + 'O botão deve conter o nome do tipo', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    //     const Electric = getByRole('button', { name: 'Electric' });
    //     const Fire = getByRole('button', { name: 'Fire' });
    //     const Psychic = getByRole('button', { name: 'Psychic' });
    //     const Bug = getByRole('button', { name: 'Bug' });
    //     const Poison = getByRole('button', { name: 'Poison' });
    //     const Dragon = getByRole('button', { name: 'Dragon' });
    //     const Normal = getByRole('button', { name: 'Normal' });
    getByText('Fire');
    fireEvent.click(getByText('Fire'));
    expect(getByText('Charmander')).toBeInTheDocument();
    getByText('Dragon');
    fireEvent.click(getByText('Dragon'));
    expect(getByText('Dragonair')).toBeInTheDocument();
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  it('O texto do botão deve ser "All"', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const all = getByRole('button', { name: 'All' });
    expect(all).toBeInTheDocument();
  });
  it('Deverá mostrar os Pokémons sem filtros quando o botão All for clicado;', () => {
    const { getByRole, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const all = getByRole('button', { name: 'All' });
    fireEvent.click(all);
    const name = getByTestId('pokemon-name');
    expect(name).toHaveTextContent('Pikachu');
  });
});

describe('Testando os botões', () => {
  it('Teste se criado dinamicamente botão de filtro para cada tipo pokémon', () => {
    const { getByRole, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const all = getByRole('button', { name: 'All' });
    expect(all).toBeInTheDocument();

    const fireButton = getByRole('button', { name: 'Fire' });
    expect(fireButton).toBeInTheDocument();
    fireEvent.click(fireButton);
    expect(getByTestId('pokemonType')).toHaveTextContent('Fire');

    const electricButton = getByRole('button', { name: 'Electric' });
    expect(electricButton).toBeInTheDocument();
    fireEvent.click(electricButton);
    expect(getByTestId('pokemonType')).toHaveTextContent('Electric');

    const bugButton = getByRole('button', { name: 'Bug' });
    expect(bugButton).toBeInTheDocument();
    fireEvent.click(bugButton);
    expect(getByTestId('pokemonType')).toHaveTextContent('Bug');

    const poisonButton = getByRole('button', { name: 'Poison' });
    expect(poisonButton).toBeInTheDocument();
    fireEvent.click(poisonButton);
    expect(getByTestId('pokemonType')).toHaveTextContent('Poison');

    const psychicButton = getByRole('button', { name: 'Psychic' });
    expect(psychicButton).toBeInTheDocument();
    fireEvent.click(psychicButton);
    expect(getByTestId('pokemonType')).toHaveTextContent('Psychic');

    const normalButton = getByRole('button', { name: 'Normal' });
    expect(normalButton).toBeInTheDocument();
    fireEvent.click(normalButton);
    expect(getByTestId('pokemonType')).toHaveTextContent('Normal');

    const dragonButton = getByRole('button', { name: 'Dragon' });
    expect(dragonButton).toBeInTheDocument();
    fireEvent.click(dragonButton);
    expect(getByTestId('pokemonType')).toHaveTextContent('Dragon');
  });

  it('Botão `Próximo pokémon` desabilita quando houver apenas um Pokémon', () => {
    const { getByText, getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const dragonButton = getByRole('button', { name: 'Dragon' });
    fireEvent.click(dragonButton);
    expect(getByText(/Próximo pokémon/i)).toBeDisabled();
  });
});
