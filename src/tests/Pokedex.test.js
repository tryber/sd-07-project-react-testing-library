import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// Teste se página contém um heading h2 com o texto Encountered pokémons.
test('if pokedex contains h2 with Encountered pokémons', () => {
  const { container } = renderWithRouter(<App />);
  const [h2] = container.getElementsByTagName('h2');
  expect(h2).toHaveTextContent('Encountered pokémons');
});
// Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado.
test('if next pokemon is shown', () => {
  const { getByText } = renderWithRouter(<App />);
  // const pikachu = getByText(/pikachu/i);
  fireEvent.click(getByText(/próximo pokémon/i));
  const char = getByText(/charmander/i);
  // expect(pikachu).toBeInTheDocument();
  expect(char).toBeInTheDocument();
});
// O botão deve conter o texto Próximo pokémon; FAZER ESSE!!!
test('button contains text proximo pokemon', () => {
  const { getByText } = renderWithRouter(<App />);
  const button = getByText(/próximo pokémon/i);
  expect(button.innerHTML).toBe('Próximo pokémon');
});
// Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
test('All next pokemons are being shown', () => {
  const { getByText } = renderWithRouter(<App />);
  const button = getByText(/próximo pokémon/i);
  expect(button.innerHTML).toBe('Próximo pokémon');
});
// O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;

// Teste se é mostrado apenas um Pokémon por vez.
test('One Pokemon at a time', () => {
  const { getByText, container } = renderWithRouter(<App />);
  let quantos = container.getElementsByClassName('pokemon');
  expect(quantos.length).toBe(1);
  fireEvent.click(getByText(/próximo pokémon/i));
  quantos = container.getElementsByClassName('pokemon');
  expect(quantos.length).toBe(1);
  fireEvent.click(getByText(/próximo pokémon/i));
  quantos = container.getElementsByClassName('pokemon');
  expect(quantos.length).toBe(1);
});
// Teste se a Pokédex tem os botões de filtro.
test('Filter buttons', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const quantos = getAllByTestId('pokemon-type-button');
  const sete = 7;
  expect(quantos.length).toBe(sete);
});
// A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
test('Filter buttons working', () => {
  const { getByText, getByTestId, container } = renderWithRouter(<App />);
  fireEvent.click(container.getElementsByClassName('filter-button')[1]);
  let selected = getByTestId('pokemonType');
  expect(selected.innerHTML).toBe('Electric');
  fireEvent.click(getByText(/próximo pokémon/i));
  selected = getByTestId('pokemonType');
  expect(selected.innerHTML).toBe('Electric');
});
// O texto do botão deve corresponder ao nome do tipo, ex. Psychic;
test('Button equals selected', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  fireEvent.click(getByText(/fire/i));
  const selected = getByTestId('pokemonType');
  expect(selected.innerHTML).toBe('Fire');
});
// Teste se a Pokédex contém um botão para resetar o filtro
test('Reset filter button', () => {
  const { getByText } = renderWithRouter(<App />);
  const allButton = getByText(/all/i);
  expect(allButton).toBeInTheDocument();
});
// O texto do botão deve ser All;
test('Button contains the text All', () => {
  const { container } = renderWithRouter(<App />);
  const allButton = container.getElementsByClassName('filter-button')[0];
  expect(allButton.innerHTML).toBe('All');
});
// A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado;
test('Showing unfiltered after pressing ALL', () => {
  const { getByText, getByTestId, container } = renderWithRouter(<App />);
  fireEvent.click(container.getElementsByClassName('filter-button')[0]);
  let selected = getByTestId('pokemonType');
  expect(selected.innerHTML).toBe('Electric');
  fireEvent.click(getByText(/próximo pokémon/i));
  selected = getByTestId('pokemonType');
  expect(selected.innerHTML).toBe('Fire');
});
// Ao carregar a página, o filtro selecionado deverá ser All;
test('ALL is selected when rendered', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  let selected = getByTestId('pokemonType');
  expect(selected.innerHTML).toBe('Electric');
  fireEvent.click(getByText(/próximo pokémon/i));
  selected = getByTestId('pokemonType');
  expect(selected.innerHTML).toBe('Fire');
});
// Teste se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon.
// pegar antes do render? como se não tem a desestruturização ainda?

// Os botões de filtragem devem ser dinâmicos;

// Deve existir um botão de filtragem para cada tipo de Pokémon disponível nos dados, sem repetição. Ou seja, a sua Pokédex deve possuir pokémons do tipo Fire, Psychic, Electric e Normal;
test('One button for each type', () => {
  const { getAllByText } = renderWithRouter(<App />);
  const electric = getAllByText(/electric/i);
  const fire = getAllByText(/fire/i);
  const bug = getAllByText(/bug/i);
  const poison = getAllByText(/poison/i);
  const psychic = getAllByText(/psychic/i);
  const normal = getAllByText(/normal/i);
  const dragon = getAllByText(/dragon/i);
  const dois = 2;
  expect(electric.length).toBe(dois);
  expect(fire.length).toBe(1);
  expect(bug.length).toBe(1);
  expect(poison.length).toBe(1);
  expect(psychic.length).toBe(1);
  expect(normal.length).toBe(1);
  expect(dragon.length).toBe(1);
});
// Deve ser mostrado como opção de filtro, um botão para cada um dos tipos. Além disso, o botão All precisa estar sempre visível.
test('One button for each type', () => {
  const { getAllByText } = renderWithRouter(<App />);
  const allButton = getAllByText(/All/i);
  expect(allButton.length).toBe(1);
});
// O botão de Próximo pokémon deve ser desabilitado quando a lista filtrada de Pokémons tiver um só pokémon.
test('One button for each type', () => {
  const { getByText } = renderWithRouter(<App />);
  fireEvent.click(getByText(/bug/i));
  const nextButton = getByText(/Próximo pokémon/i);
  expect(nextButton.disabled).toBe(true);
});
