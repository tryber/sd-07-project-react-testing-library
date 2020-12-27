import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Show the next pokemon in list when the btns clicked', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);
  const pokeminhos = [
    'Charmander',
    'Caterpie',
    'Ekans',
    'Alakazam',
    'Mew',
    'Rapidash',
    'Snorlax',
    'Dragonair',
    'Pikachu'];
  const button = getByRole('button', { name: 'Próximo pokémon' });
  const index = 0;
  for (let i = index; i < pokeminhos.length; i += 1) {
    fireEvent.click(button);
    expect(getByText(pokeminhos[i])).toBeInTheDocument();
  }
});

test('the btn have the text next pokémon', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const button = getByTestId('next-pokemon');
  expect(button).toHaveTextContent('Próximo pokémon');
  expect(button).toBeInTheDocument();
});

test('Test if the next poke apears one at the time', () => {
  const { getAllByTestId, getByRole } = renderWithRouter(<App />);
  const lalas = getAllByTestId('pokemon-name');
  const number = 1;
  expect(lalas.length).toBe(number);
  expect(lalas[0]).toBeInTheDocument();
  const button = getByRole('button', { name: 'Próximo pokémon' });
  fireEvent.click(button);
  expect(lalas.length).toBe(number);
});

test('shows one poke at the time', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const lalas = getAllByTestId('pokemon-name');
  const number = 1;
  expect(lalas.length).toBe(number);
  expect(lalas[0]).toBeInTheDocument();
});

test('Teste se tem os botões de filtro', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  const sevenButtons = getAllByTestId('pokemon-type-button');
  const number = 7;
  expect(sevenButtons).toHaveLength(number);
});

// test('Pokémons do tipo selecionado através do botão de tipo devem estar circulados', () => {
//   const { getByRole } = renderWithRouter(<App />);
//   //teste de filtragem de tipo .
//   const button1 = getByRole('button', { name: 'Electric' });
//   fireEvent.click(button1);

//   expect(button1).toBeInTheDocument('Electric');
//   const button2 = getByRole('button', { name: 'Fire' });
//   expect(button2).toBeInTheDocument('Fire');
//   const button3 = getByRole('button', { name: 'Bug' });
//   expect(button3).toBeInTheDocument('Bug');
//   const button4 = getByRole('button', { name: 'Poison' });
//   expect(button4).toBeInTheDocument('Poison');
//   const button5 = getByRole('button', { name: 'Psychic' });
//   expect(button5).toBeInTheDocument('Normal');
// });

test('Pokémons do tipo selecionado pelo botão de tipo devem estar circulados', () => {
  const { getByRole, getByText } = renderWithRouter(<App />);
  const button1 = getByRole('button', { name: 'Psychic' });
  const btnNext = getByRole('button', { name: 'Próximo pokémon' });
  fireEvent.click(button1);
  const alakazam = getByText('Alakazam');
  expect(alakazam).toBeInTheDocument();
  fireEvent.click(btnNext);
  const Mew = getByText('Mew');
  expect(Mew).toBeInTheDocument();
  fireEvent.click(btnNext);
  const alakazams = getByText('Alakazam');
  expect(alakazams).toBeInTheDocument();
});

test('Não sei o  enunciado disso', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const { getByText } = renderWithRouter(<App />);
  const buttonAll = getByText('All');
  expect(buttonAll).toBeInTheDocument();
  fireEvent.click(buttonAll);
  const pikachu = getByText('Pikachu');
  expect(pikachu).toBeInTheDocument();
});

test('é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {
  const { getAllByText } = renderWithRouter(<App />);
  const tiposPoke = ['Electric', 'Fire', 'Bug',
    'Poison', 'Psychic', 'Normal', 'Dragon'];

  const index = 0;
  for (let i = index; i < tiposPoke.length; i += 1) {
    const g = getAllByText(tiposPoke[i]);
    expect(g[0]).toBeInTheDocument();
  }
});
// alterar um tipo de pokemon ou um inseir um tipo de pokemon, renderizar e testar se aparece botao correspondente.

test('desabilitado lista filtrada de Pokémons tiver um só pokémon', () => {
  const { getByRole } = renderWithRouter(<App />);
  const btElectric = getByRole('button', { name: 'Electric' });
  fireEvent.click(btElectric);
  const btNextPokemon = getByRole('button', { name: 'Próximo pokémon' });
  expect(btNextPokemon).toHaveAttribute('disabled');
});
