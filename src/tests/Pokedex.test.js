import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../components';
import App from '../App';
import pokemons from '../data';

const ALL_TYPES = [...new Set(pokemons.map((pokemon) => (pokemon.type)))];

afterEach(cleanup);

it(`Teste se página contém um heading h2
     com o texto Encountered pokémons.`, () => {
  renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />,
  );
  expect(screen.getByRole('heading')).toHaveTextContent(/Encountered pokémons/i);
});

it(`Teste se é exibido o próximo Pokémon da lista 
    quando o botão Próximo pokémon é clicado.`, () => {
  renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />,
  );
  // O botão deve conter o texto Próximo pokémon;
  expect(screen.getByTestId('next-pokemon')).toHaveTextContent(/Próximo pokémon/i);
  // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
  pokemons.forEach((pokemon) => {
    expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('next-pokemon'));
  });
  // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
  expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
});

it(`Teste se é mostrado apenas 
    um Pokémon por vez.`, () => {
  renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />,
  );
  expect(screen.queryAllByTestId('pokemon-name').length).toBe(1);
});

it(`Teste se a Pokédex tem os 
    botões de filtro.`, () => {
  renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />,
  );
  // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
  fireEvent.click(screen.getByText('Fire'));
  // O texto do botão deve corresponder ao nome do tipo, ex. Psychic;
  ALL_TYPES.forEach((type) => {
    fireEvent.click(screen.getByText(type));
    pokemons.filter((pokemon) => pokemon.type === type).forEach((pokemon) => {
      expect(screen.getByTestId('pokemon-name')).toHaveTextContent(pokemon.name);
      fireEvent.click(screen.getByTestId('next-pokemon'));
    });
  });
});

it(`Teste se a Pokédex contém um botão 
    para resetar o filtro`, () => {
  renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />,
  );
  // Ao carregar a página, o filtro selecionado deverá ser All;
  pokemons.forEach((pokemon) => {
    expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('next-pokemon'));
  });

  // O texto do botão deve ser All;
  expect(screen.getByText('All')).toBeInTheDocument();
  // A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado;
  fireEvent.click(screen.getByText('All'));
  pokemons.forEach((pokemon) => {
    expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('next-pokemon'));
  });
});

it(`Teste se é criado, dinamicamente, 
    um botão de filtro para cada tipo de Pokémon.`, () => {
  renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />,
  );
  // Os botões de filtragem devem ser dinâmicos;
  // Deve existir um botão de filtragem para cada tipo de Pokémon disponível nos dados, sem repetição. Ou seja, a sua Pokédex deve possuir pokémons do tipo Fire, Psychic, Electric e Normal;
  // Deve ser mostrado como opção de filtro, um botão para cada um dos tipos. Além disso, o botão All precisa estar sempre visível.
  expect(screen.getAllByTestId('pokemon-type-button').length).toBe(ALL_TYPES.length);
  expect(screen.getByText('All')).toBeInTheDocument();
});

it(`O botão de Próximo pokémon deve ser desabilitado quando 
  a lista filtrada de Pokémons tiver um só pokémon.`, () => {
  renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />,
  );
  ALL_TYPES.forEach((type) => {
    fireEvent.click(
      screen.getAllByTestId('pokemon-type-button')
        .find((button) => button.innerHTML === type),
    );
    if (pokemons.filter((pokemon) => pokemon.type === type).length === 1) {
      expect(screen.getByTestId('next-pokemon')).toBeDisabled();
    } else {
      expect(screen.getByTestId('next-pokemon')).not.toBeDisabled();
    }
  });
});
