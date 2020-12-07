import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{ component }</Router>), history,
  });
};

test('Teste se página contém um heading', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText('Encountered pokémons');

  expect(heading).toBeInTheDocument();
});

describe('Teste o botão Próximo pokémon', () => {
  test('button contains a text', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(/Próximo pokémon/i);

    expect(nextButton).toBeInTheDocument();
  });

  test('if pokemons changes', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(/Próximo pokémon/i);

    const pokemonAnterior = getByText(/pikachu/i);
    expect(pokemonAnterior).toBeInTheDocument();
    userEvent.click(nextButton);
    const pokemonAtual = getByText(/charmander/i);
    expect(pokemonAtual).toBeInTheDocument();
  });

  test('if last pokemon changes to first', () => {
    const { getByText } = renderWithRouter(<App />);
    const nextButton = getByText(/Próximo pokémon/i);
    const numberOfClicks = 8;

    for (let index = 1; index <= numberOfClicks; index += 1) {
      userEvent.click(nextButton);
    }

    const pokemonAnterior = getByText(/dragonair/i);
    expect(pokemonAnterior).toBeInTheDocument();
    userEvent.click(nextButton);
    const pokemonAtual = getByText(/pikachu/i);
    expect(pokemonAtual).toBeInTheDocument();
  });
});

test('if only one is showed a time', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const pokemons = getAllByTestId('pokemon-name');
  expect(pokemons.length).toBe(1);
});

describe('Teste se a Pokédex tem os botões de filtro', () => {
  test('on filter, only this pokemons are showed', () => {
    const { getAllByTestId, getByRole, getByTestId } = renderWithRouter(<App />);

    const buttons = getAllByTestId('pokemon-type-button');
    const numberOfTypes = 7;
    expect(buttons.length).toBe(numberOfTypes);

    const fireButton = getByRole('button', { name: /fire/i });
    expect(fireButton).toBeInTheDocument();

    const maximunClicks = 2;
    for (let index = 1; index <= maximunClicks; index += 1) {
      userEvent.click(fireButton);
      const typeFire = getByTestId('pokemonType');
      expect(typeFire.innerHTML).toEqual('Fire');
    }
  });

  test('if text on button are igual its type', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemonsTypes = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    const buttons = getAllByTestId('pokemon-type-button');

    const startCount = 0;
    for (let index = startCount; index < pokemonsTypes.length; index += 1) {
      expect(buttons[index].innerHTML).toEqual(pokemonsTypes[index]);
    }
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  test('there is a button with text All', () => {
    const { getByText } = renderWithRouter(<App />);
    const allButton = getByText(/all/i);
    expect(allButton).toBeInTheDocument();
  });

  test('if show all pokemons', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const allButton = getByText(/all/i);
    const nextButton = getByText(/próximo pokémon/i);
    expect(nextButton).toBeInTheDocument();
    const allPokemons = [
      {
        name: 'Pikachu',
        type: 'Electric',
      },
      {
        name: 'Charmander',
        type: 'Fire',
      },
      {
        name: 'Caterpie',
        type: 'Bug',
      },
      {
        name: 'Ekans',
        type: 'Poison',
      },
      {
        name: 'Alakazam',
        type: 'Psychic',
      },
      {
        name: 'Mew',
        type: 'Psychic',
      },
      {
        name: 'Rapidash',
        type: 'Fire',
      },
      {
        name: 'Snorlax',
        type: 'Normal',
      },
      {
        name: 'Dragonair',
        type: 'Dragon',
      },
    ];
    userEvent.click(allButton);

    const startCount = 0;
    for (let index = startCount; index < allPokemons.length; index += 1) {
      const pokeName = getByTestId('pokemon-name');
      const pokeType = getByTestId('pokemonType');
      const { name, type } = allPokemons[index];
      expect(pokeName.innerHTML).toEqual(name);
      expect(pokeType.innerHTML).toEqual(type);
      userEvent.click(nextButton);
    }
  });

  test('on load, the filter is All', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const nextButton = getByText(/próximo pokémon/i);
    const allPokemons = [
      {
        name: 'Pikachu',
        type: 'Electric',
      },
      {
        name: 'Charmander',
        type: 'Fire',
      },
      {
        name: 'Caterpie',
        type: 'Bug',
      },
      {
        name: 'Ekans',
        type: 'Poison',
      },
      {
        name: 'Alakazam',
        type: 'Psychic',
      },
      {
        name: 'Mew',
        type: 'Psychic',
      },
      {
        name: 'Rapidash',
        type: 'Fire',
      },
      {
        name: 'Snorlax',
        type: 'Normal',
      },
      {
        name: 'Dragonair',
        type: 'Dragon',
      },
    ];

    const startCount = 0;
    for (let index = startCount; index < allPokemons.length; index += 1) {
      const pokeName = getByTestId('pokemon-name');
      const pokeType = getByTestId('pokemonType');
      const { name, type } = allPokemons[index];
      expect(pokeName.innerHTML).toEqual(name);
      expect(pokeType.innerHTML).toEqual(type);
      userEvent.click(nextButton);
    }
  });
});
