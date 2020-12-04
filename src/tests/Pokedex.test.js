import React from 'react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';

const pokemons = [
  {
    id: 0,
    name: 'pikachu',
    type: 'electric',
    averageWeight: { value: '5', measurementUnit: 'kg' },
  },
  { id: 1,
    name: 'charizard',
    type: 'fire',
    averageWeight: { value: '70', measurementUnit: 'kg' },
  },
  { id: 2,
    name: 'caterpie',
    type: 'bug',
    averageWeight: { value: '8', measurementUnit: 'kg' },
  },
];
const isFavorited = { 0: false, 1: false, 2: false };
const Rendering = () => renderWithRouter(
  <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFavorited } />,
);
const three = 3;

test('Testando se página contém um <h2> com o texto "Encountered pokémons".', () => {
  const { container } = Rendering();
  const h2 = container.querySelector('h2');

  expect(h2).toHaveTextContent(/Encountered pokémons/i);
});

test('Testando se é mostrado apenas um pokemon por vez.', () => {
  const { queryAllByTestId } = Rendering();
  const pokemonCard = queryAllByTestId('pokemon-name');

  expect(pokemonCard).toHaveLength(1);
});

describe(`Testando se é exibido o próximo Pokémon da lista 
quando o botão "Próximo pokémon" é clicado.`, () => {
  it('Verificando se o botão contém o texto "Próximo pokémon"', () => {
    const { getByText } = Rendering();

    expect(getByText(/Próximo pokémon/i)).toBeInTheDocument();
  });

  it('Verificando se, ao clicar no botão, ele altera o pokemon mostrado', () => {
    const { getByTestId, getByText } = Rendering();

    const button = getByText(/Próximo pokémon/i);
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(/pikachu/i);

    userEvent.click(button);
    expect(pokemonName).toHaveTextContent(/charizard/i);
  });

  it('Ao clicar no botão, no último pokemon da lista, ele retorna ao primeiro.', () => {
    const { getByTestId, getByText } = Rendering();

    const button = getByText(/Próximo pokémon/i);
    const pokemonName = getByTestId('pokemon-name');

    expect(pokemonName).toHaveTextContent(/pikachu/i);
    Array.from(three).forEach(() => userEvent.click(button));
    expect(pokemonName).toHaveTextContent(/pikachu/i);
  });
});

describe('Testando os filtros da Pokedex', () => {
  it('Verificando se ele filtra apenas pokemons do tipo selecionado', () => {
    const { getByText, getByTestId } = Rendering();

    const fireButton = getByText(/Fire/i);
    const bugButton = getByText(/Bug/i);
    const pokemonName = getByTestId('pokemon-name');

    expect(pokemonName).toHaveTextContent(/pikachu/i);

    userEvent.click(fireButton);
    expect(pokemonName).toHaveTextContent(/charizard/i);

    userEvent.click(bugButton);
    expect(pokemonName).toHaveTextContent(/caterpie/i);
  });

  it('Verificando se o botões correspondem aos valores dos tipos', () => {
    const { queryAllByTestId } = Rendering();
    const types = ['electric', 'fire', 'bug'];

    const typeButtons = queryAllByTestId('pokemon-type-button');
    expect(typeButtons).toHaveLength(three);
    typeButtons.forEach((type, index) => expect(type).toHaveTextContent(types[index]));
  });
});

describe('Testando se a Pokédex contém um botão para resetar o filtro', () => {
  it('Verificando se o texto do botão deve ser "All"', () => {
    const { getByText } = Rendering();

    const allButton = getByText(/All/i);
    expect(allButton).toBeInTheDocument();
  });

  it('Mostra os TODOS os Pokémons, quando o botão "All" for selecionado', () => {
    const { getByTestId, getByText } = Rendering();

    const allButton = getByText(/All/i);
    const nextButton = getByText(/Próximo pokémon/i);
    const pokemonType = getByTestId('pokemonType');

    userEvent.click(allButton);
    expect(pokemonType).toHaveTextContent(/Electric/i);

    userEvent.click(nextButton);
    expect(pokemonType).toHaveTextContent(/Fire/i);
  });

  it('Verificando se, ao entrar na página, a filtragem inicial é "All"', () => {
    const { getByTestId, getByText } = Rendering();

    const nextButton = getByText(/Próximo pokémon/i);
    const pokemonType = getByTestId('pokemonType');

    expect(pokemonType).toHaveTextContent(/Electric/i);

    userEvent.click(nextButton);
    expect(pokemonType).toHaveTextContent(/Fire/i);
  });
});

describe('Testando se os botões criados são dinamicos', () => {
  it('Verificando se os botões criados são dinamicos com base nos tipos', () => {
    const { queryAllByTestId } = Rendering();

    const typeButtons = queryAllByTestId('pokemon-type-button');
    const types = ['electric', 'fire', 'bug'];

    typeButtons.forEach((type, index) => expect(type).toHaveTextContent(types[index]));
  });

  it('Verificando se os tipos não se repetem.', () => {
    const { queryAllByTestId } = Rendering();

    const typeButtons = queryAllByTestId('pokemon-type-button');

    expect(typeButtons).toHaveLength(three);
  });

  it('Verifica se o botão "All" sempre aparece', () => {
    const { queryAllByTestId, getByText, getByTestId } = Rendering();

    const allButton = getByText(/All/i);
    const typeButtons = queryAllByTestId('pokemon-type-button');
    const pokemonTypes = ['pikachu', 'charizard', 'caterpie'];

    typeButtons.forEach((type, index) => {
      userEvent.click(type);
      expect(getByTestId('pokemon-name')).toHaveTextContent(pokemonTypes[index]);

      expect(allButton).toBeInTheDocument();
    });
  });

  it('O botão é desabilitado quando não tem outros pokémons do mesmo tipo.', () => {
    const { getByText } = Rendering();
    const nextButton = getByText(/Próximo pokémon/i);
    const fireButton = getByText(/Fire/i);

    userEvent.click(fireButton);

    expect(nextButton).toHaveAttribute('disabled');
  });
});
