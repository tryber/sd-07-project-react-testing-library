import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Testando se a página contém H2', () => {
  const { getByText } = renderWithRouter(<App />);
  const h2 = getByText(/Encountered pokémons/i);
  expect(h2).toBeInTheDocument();
});

test('Testando se aparece o texto do botão próximo pokemon', () => {
  const { getByText } = renderWithRouter(<App />);
  const textBtn = getByText(/Próximo pokémon/i);
  expect(textBtn).toBeInTheDocument();
});

test('Os próximos Pokémons da lista devem ser mostrados, um a um', () => {
  const { getByTestId, getByText } = renderWithRouter(<App />);
  const btnNext = getByTestId('next-pokemon');
  expect(getByText(/Pikachu/i)).toBeInTheDocument();
  fireEvent.click(btnNext);
  expect(getByText(/Charmander/i)).toBeInTheDocument();
  fireEvent.click(btnNext);
  expect(getByText(/Caterpie/i)).toBeInTheDocument();
  fireEvent.click(btnNext);
  expect(getByText(/Ekans/i)).toBeInTheDocument();
  fireEvent.click(btnNext);
  expect(getByText(/Alakazam/i)).toBeInTheDocument();
  fireEvent.click(btnNext);
  expect(getByText(/Mew/i)).toBeInTheDocument();
  fireEvent.click(btnNext);
  expect(getByText(/Rapidash/i)).toBeInTheDocument();
  fireEvent.click(btnNext);
  expect(getByText(/Snorlax/i)).toBeInTheDocument();
  fireEvent.click(btnNext);
  expect(getByText(/Dragonair/i)).toBeInTheDocument();
  fireEvent.click(btnNext);
  expect(getByText(/Pikachu/i)).toBeInTheDocument();
});

test('Teste se a Pokédex tem os botões de filtro', () => {
  const btnLength = 7;
  const { getAllByTestId } = renderWithRouter(<App />);
  const btnFilter = getAllByTestId('pokemon-type-button');
  expect(btnFilter.length).toBe(btnLength);
});

test('Teste dos botões de filtro por tipo', () => {
  const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
  const btnFilter = getAllByTestId('pokemon-type-button');

  fireEvent.click(btnFilter[0]);
  expect((getByTestId('pokemonType').innerHTML)).toBe(btnFilter[0].innerHTML);

  fireEvent.click(btnFilter[1]);
  expect((getByTestId('pokemonType').innerHTML)).toBe(btnFilter[1].innerHTML);

  fireEvent.click(btnFilter[2]);
  expect((getByTestId('pokemonType').innerHTML)).toBe(btnFilter[2].innerHTML);

  fireEvent.click(btnFilter[3]);
  expect((getByTestId('pokemonType').innerHTML)).toBe(btnFilter[3].innerHTML);

  fireEvent.click(btnFilter[4]);
  expect((getByTestId('pokemonType').innerHTML)).toBe(btnFilter[4].innerHTML);

  fireEvent.click(btnFilter[5]);
  expect((getByTestId('pokemonType').innerHTML)).toBe(btnFilter[5].innerHTML);

  fireEvent.click(btnFilter[6]);
  expect((getByTestId('pokemonType').innerHTML)).toBe(btnFilter[6].innerHTML);
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  const { getByTestId } = renderWithRouter(<App />);
  const btnfilteredAll = getByTestId('');
  expect(btnfilteredAll.innerHTML).toBe('All');
});

test('Testando se com o filtro ALL todos os pokemons renderizam', () => {
  const { getByTestId, getByText, getAllByTestId } = renderWithRouter(<App />);
  const btnfilteredAll = getByTestId('');
  const btnFilterFire = getAllByTestId('pokemon-type-button');
  const btnFilterPoison = getAllByTestId('pokemon-type-button');

  fireEvent.click(btnfilteredAll);
  const btnNext = getByTestId('next-pokemon');
  expect(getByText(/Pikachu/i)).toBeInTheDocument();
  fireEvent.click(btnNext);
  expect(getByText(/Charmander/i)).toBeInTheDocument();
  fireEvent.click(btnNext);
  expect(getByText(/Caterpie/i)).toBeInTheDocument();
  fireEvent.click(btnNext);
  expect(getByText(/Ekans/i)).toBeInTheDocument();
  fireEvent.click(btnNext);
  expect(getByText(/Alakazam/i)).toBeInTheDocument();
  fireEvent.click(btnNext);
  expect(getByText(/Mew/i)).toBeInTheDocument();
  fireEvent.click(btnNext);
  expect(getByText(/Rapidash/i)).toBeInTheDocument();
  fireEvent.click(btnNext);
  expect(getByText(/Snorlax/i)).toBeInTheDocument();
  fireEvent.click(btnNext);
  expect(getByText(/Dragonair/i)).toBeInTheDocument();
  fireEvent.click(btnNext);
  expect(getByText(/Pikachu/i)).toBeInTheDocument();

  fireEvent.click(btnFilterFire[1]);
  expect(getByText(/Charmander/i)).toBeInTheDocument();

  fireEvent.click(btnFilterPoison[3]);
  expect(getByText(/Ekans/i)).toBeInTheDocument();
});
