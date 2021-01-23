import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import App from '../App';
import pokemons from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: true,
  148: false,
  151: false,
};

test('se a página coném um heading h2 com Encountred pokemons', () => {
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);
  const h2 = screen.getByRole('heading', { name: 'Encountered pokémons' });
  expect(h2.tagName).toBe('H2');
});

test('O botão deve conter o texto Próximo pokémon', () => {
  renderWithRouter(<App />);
  const btn = screen.getByTestId('next-pokemon');
  expect(btn).toBeInTheDocument();
  expect(btn.type).toBe('button');
  expect(btn).toHaveTextContent('Próximo pokémon');
});

test('Os próximos Pokémons da lista devem ser mostrados', () => {
  renderWithRouter(<App />);
  const btn = screen.getByTestId('next-pokemon');
  fireEvent.click(btn);
  const pokemonName = screen.getByText(/Charmander/i);
  expect(pokemonName).toBeInTheDocument();
});

test('O primeiro Pokémon da lista deve ser mostrado quando avançar do último', () => {
  renderWithRouter(<App />);
  const btn = screen.getByTestId('next-pokemon');
  const clicks = 9;
  for (let count = 1; count < clicks; count += 1) {
    fireEvent.click(btn);
  }
  const drago = screen.getByText(/Dragonair/i);
  expect(drago).toBeInTheDocument();

  fireEvent.click(btn);
  const pika = screen.getByText(/Pikachu/i);
  expect(pika).toBeInTheDocument();
});

test('Teste se é mostrado apenas um Pokémon por vez.', () => {
  renderWithRouter(<App />);
  const btn = screen.getByTestId('next-pokemon');
  const clicks = 8;
  for (let count = 1; count < clicks + 1; count += 1) {
    const name = screen.getAllByTestId('pokemon-name');
    fireEvent.click(btn);
    const nmagic = 1;
    expect(name.length).toBe(nmagic);
  }
});

test('se após o filtro, a pokedéx circula somente pelos pokemons daquele tipo', () => {
  renderWithRouter(<App />);
  const btn = screen.getByTestId('next-pokemon');
  const fire = screen.getByRole('button', { name: 'Fire' });
  const nmagic = 5;
  fireEvent.click(fire);
  for (let index = 1; index < nmagic; index += 1) {
    const type = screen.getByTestId('pokemonType');
    expect(type.firstChild.nodeValue).toBe('Fire');
    fireEvent.click(btn);
  }
});

test('O texto do botão deve corresponder ao nome do tipo ex. Psychic', () => {
  renderWithRouter(<App />);
  const psychic = screen.getByRole('button', { name: 'Psychic' });
  fireEvent.click(psychic);
  expect(psychic.textContent).toBe('Psychic');
});

test('O texto do botão deve ser All', () => {
  renderWithRouter(<App />);
  const btn = screen.getByRole('button', { name: 'All' });
  expect(btn.textContent).toBe('All');
});

test('deverá mostrar os Pokémons normalmente quando o botão All for clicado', () => {
  renderWithRouter(<App />);
  const btn = screen.getByTestId('next-pokemon');
  const all = screen.getByRole('button', { name: 'All' });
  fireEvent.click(all);
  const electric = screen.getByTestId('pokemonType');
  expect(electric.textContent).toBe('Electric');
  fireEvent.click(btn);
  const fire = screen.getByTestId('pokemonType');
  expect(fire.textContent).toBe('Fire');
  fireEvent.click(btn);
  const bug = screen.getByTestId('pokemonType');
  expect(bug.textContent).toBe('Bug');
  fireEvent.click(btn);
  const poison = screen.getByTestId('pokemonType');
  expect(poison.textContent).toBe('Poison');
  fireEvent.click(btn);
  const psychic = screen.getByTestId('pokemonType');
  expect(psychic.textContent).toBe('Psychic');
  fireEvent.click(btn);
  expect(psychic.textContent).toBe('Psychic');
  fireEvent.click(btn);
  expect(fire.textContent).toBe('Fire');
  fireEvent.click(btn);
  const normal = screen.getByTestId('pokemonType');
  expect(normal.textContent).toBe('Normal');
  fireEvent.click(btn);
  const dragon = screen.getByTestId('pokemonType');
  expect(dragon.textContent).toBe('Dragon');
  fireEvent.click(btn);
  expect(electric.textContent).toBe('Electric');
});

test('Ao carregar a página, o filtro selecionado deverá ser All', () => {
  renderWithRouter(<App />);
  const btn = screen.getByTestId('next-pokemon');
  const electric = screen.getByTestId('pokemonType');
  expect(electric.textContent).toBe('Electric');
  fireEvent.click(btn);
  const fire = screen.getByTestId('pokemonType');
  expect(fire.textContent).toBe('Fire');
  fireEvent.click(btn);
  const bug = screen.getByTestId('pokemonType');
  expect(bug.textContent).toBe('Bug');
  fireEvent.click(btn);
  const poison = screen.getByTestId('pokemonType');
  expect(poison.textContent).toBe('Poison');
  fireEvent.click(btn);
  const psychic = screen.getByTestId('pokemonType');
  expect(psychic.textContent).toBe('Psychic');
  fireEvent.click(btn);
  expect(psychic.textContent).toBe('Psychic');
  fireEvent.click(btn);
  expect(fire.textContent).toBe('Fire');
  fireEvent.click(btn);
  const normal = screen.getByTestId('pokemonType');
  expect(normal.textContent).toBe('Normal');
  fireEvent.click(btn);
  const dragon = screen.getByTestId('pokemonType');
  expect(dragon.textContent).toBe('Dragon');
  fireEvent.click(btn);
  expect(electric.textContent).toBe('Electric');
});

test('Os botões de filtragem devem ser dinâmicos', () => {
  renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />,
  );
  const btn = screen.getAllByTestId('pokemon-type-button');
  const types2 = [
    ...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];

  expect(btn.length).toBe(types2.length);
});

test('deve possuir pokémons do tipo Fire, Psychic, Electric e Normal', () => {
  renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />,
  );
  const btn = screen.getAllByTestId('pokemon-type-button');
  const type = btn.map((item) => item.firstChild.nodeValue);
  expect(type).toContain('Fire');
  expect(type).toContain('Psychic');
  expect(type).toContain('Electric');
  expect(type).toContain('Normal');
});

test('o botão All precisa estar sempre visível', () => {
  renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />,
  );
  const all = screen.getByRole('button', { name: 'All' });
  expect(all).toBeInTheDocument();
});

test('O botão de Próximo pokémon deve ser desabilitado um só pokémon', () => {
  renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />,
  );
  const electric = screen.getByRole('button', { name: 'Electric' });
  fireEvent.click(electric);
  const btn = screen.getByTestId('next-pokemon');
  expect(btn.disabled).toBeTruthy();
});
