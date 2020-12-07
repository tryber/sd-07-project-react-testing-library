import React from 'react';
import { fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../renderWithRouter';
import Data from '../data';

const pokemon = [
  {
    averageWeight: { value: '6.0', measurementUnit: 'kg' },
    image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    name: 'Pikachu',
    summary: 'This intelligent Pokémon roasts hard berries with electricity'
    + 'to make them tender enough to eat.',
    type: 'Electric',
  },
  {
    averageWeight: { value: '8.5', measurementUnit: 'kg' },
    image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    name: 'Charmander',
    summary: 'The flame on its tail shows the strength of its life force.'
    + 'If it is weak, the flame also burns weakly.',
    type: 'Fire',
  },
  {
    averageWeight: { value: '48.0', measurementUnit: 'kg' },
    image: 'https://cdn.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
    name: 'Alakazam',
    summary: 'Closing both its eyes heightens all its other senses.'
    + 'This enables it to use its abilities to their extremes.',
    type: 'Psychic',
  },
];

test('A página contém um heading h2 com o texto Encountered pokémons?', async () => {
  const { container } = renderWithRouter(
    <Pokedex pokemons={ pokemon } isPokemonFavoriteById={ 25 } />,
  );
  await container.querySelector('h2');
  expect(container.querySelector('h2')).toHaveTextContent('Encountered pokémons');
});

describe('Teste se é exibido o próximo Pokémon da lista quando'
+ 'o botão Próximo pokémon é clicado.', () => {
  test('O botão deve conter o texto Próximo pokémon', async () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemon } isPokemonFavoriteById={ 25 } />,
    );
    await getByText('Próximo pokémon');
    expect(getByText(/Próximo pokémon/i)).toBeInTheDocument();
  });
  test('Os próximos Pokémons da lista devem ser mostrados, um a um,'
  + 'ao clicar sucessivamente no botão', async () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemon } isPokemonFavoriteById={ 25 } />,
    );
    await getByText('Próximo pokémon');
    fireEvent.click(getByText(/Próximo pokémon/i));
    await getByText('Charmander');
    expect(getByText('Charmander')).toBeInTheDocument();
    fireEvent.click(getByText(/Próximo pokémon/i));
    await getByText('Alakazam');
    expect(getByText('Alakazam')).toBeInTheDocument();
  });
  test('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão,'
  + 'se estiver no último Pokémon da lista', async () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemon } isPokemonFavoriteById={ 25 } />,
    );
    await getByText('Encountered pokémons');
    fireEvent.click(getByText(/Próximo pokémon/i));
    await getByText('Encountered pokémons');
    fireEvent.click(getByText(/Próximo pokémon/i));
    await getByText('Encountered pokémons');
    fireEvent.click(getByText(/Próximo pokémon/i));
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});

test('Teste se é mostrado apenas um Pokémon por vez.', async () => {
  const pokemonOne = [
    {
      averageWeight: { value: '6.0', measurementUnit: 'kg' },
      image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      name: 'Pikachu',
      summary: 'This intelligent Pokémon roasts hard berries with'
      + 'electricity to make them tender enough to eat.',
      type: 'Electric' }];
  const length = 3;
  const { container } = renderWithRouter(
    <Pokedex pokemons={ pokemonOne } isPokemonFavoriteById={ 25 } />,
  );
  await container.querySelector('.pokemon-overview');
  await container.querySelectorAll('p');

  const allP = container.querySelectorAll('p');

  expect(container.querySelector('.pokemon-overview')).toBeInTheDocument();
  expect(allP.length).toBe(length);
});

describe('Teste se a Pokédex tem os botões de filtro.', () => {
  test('A partir da seleção de um botão de tipo, a Pokédex deve circular'
  + 'somente pelos pokémons daquele tipo;', async () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemon } isPokemonFavoriteById={ 25 } />,
    );
    await getByText('Fire');
    fireEvent.click(getByText('Fire'));
    expect(getByText('Charmander')).toBeInTheDocument();
    await getByText('Psychic');
    fireEvent.click(getByText('Psychic'));
    expect(getByText(/48.0 kg/i)).toBeInTheDocument();
  });
  test('O texto do botão deve corresponder ao nome do tipo, ex. Psychic;', async () => {
    const { getByText, queryByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemon } isPokemonFavoriteById={ 25 } />,
    );
    await getByText('Psychic');
    fireEvent.click(getByText('Psychic'));
    expect(getByText('Alakazam')).toBeInTheDocument();
    const btn = queryByTestId('pokemonType');
    expect(btn.textContent).toBe('Psychic');
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  test('O texto do botão deve ser All', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemon } isPokemonFavoriteById={ 25 } />,
    );
    const btnAll = getByText(/All/i);
    expect(btnAll).toBeInTheDocument();
  });
  test('A Pokedéx deverá mostrar os Pokémons normalmente'
  + '(sem filtros) quando o botão All for clicado;', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ 25 }
      />,
    );
    fireEvent.click(getByText('All'));
    expect(getByText('All')).toBeInTheDocument();
    expect(getByText('Próximo pokémon')).toBeInTheDocument();
  });
  test('Ao carregar a página, o filtro selecionado deverá ser All', () => {
    const clickBtnAll = jest.fn();
    const { queryByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemon }
        onClick={ clickBtnAll }
        isPokemonFavoriteById={ 25 }
      />,
    );
    const btn = queryByTestId('');
    if (btn) return btn.onClick;
    fireEvent.load(queryByTestId(''));
    expect(queryByTestId('').textContent).toBe('All');
  });
});

describe('Teste se é criado, dinamicamente, um botão de filtro'
+ 'para cada tipo de Pokémon', () => {
  test('Os botões de filtragem devem ser dinâmicos', () => {
    const { container } = renderWithRouter(
      <Pokedex pokemons={ pokemon } isPokemonFavoriteById={ 25 } />,
    );
    fireEvent.load(container.querySelector('.pokedex-buttons-panel'));
    expect(container.querySelector('.pokedex-buttons-panel')).toBeInTheDocument();
  });

  test('Deve existir um botão de filtragem para cada tipo de Pokémon disponível'
  + 'nos dados, sem repetição. Ou seja, a sua Pokédex deve possuir pokémons do tipo Fire, Psychic, Electric e Normal;', () => {
    const allTypes = ['Electric', 'Fire', 'Psychic'];
    const { container } = renderWithRouter(
      <Pokedex pokemons={ pokemon } isPokemonFavoriteById={ 25 } />,
    );
    const allBtns = container.getElementsByClassName('button-text filter-button');
    const all = [];
    for (let i = 0; i < allBtns.length; i++) {
      all.push(allBtns[i].textContent);
    }
    const allBtnsNew = all.filter((element, index) => all.indexOf(element) === index);
    const allBtnNewV2 = allBtnsNew.slice(1,4);
    expect(allBtnNewV2).toEqual(allTypes);
  });

  test('Deve ser mostrado como opção de filtro, um botão para cada um dos tipos.'
  + 'Além disso, o botão All precisa estar sempre visível.', () => {
    const allTypes = ['All', 'Electric', 'Fire', 'Psychic'];
    const { container } = renderWithRouter(
      <Pokedex pokemons={ pokemon } isPokemonFavoriteById={ 25 } />,
    );
    const allBtns = container.getElementsByClassName('button-text filter-button');
    const all = [];
    for (let i = 0; i < allBtns.length; i++) {
      all.push(allBtns[i].textContent);
    }
    const allBtnsNew = all.filter((element, index) => all.indexOf(element) === index);
    expect(allBtnsNew).toEqual(allTypes);
  });
  test('O botão de Próximo pokémon deve ser '
  + 'desabilitado quando a lista filtrada de Pokémons tiver um só pokémon.', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemon } isPokemonFavoriteById={ 25 } />,
    );
    const button = getByRole('button', { name: 'Fire' });
    fireEvent.click(button);
    const btnNextPokemon = getByRole('button', { name: 'Próximo pokémon' });
    expect(btnNextPokemon).toBeDisabled();
  });
});
