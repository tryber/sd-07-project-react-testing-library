import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

test('se a página possui o texto Encountered pokémons', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
});

test('se ao clicar no botão Próximo Pokemon, o próximo é mostrado na tela', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const btnNext = getByTestId('next-pokemon');
  expect(btnNext).toBeInTheDocument();
  expect(getByText(/Próximo pokémon/i)).toBeInTheDocument();

  pokemons.forEach((element) => {
    expect(getByText(element.name)).toBeInTheDocument();
    fireEvent.click(btnNext);
  });
});

test('se a Pokedex tem os botões de filtro', () => {
  const { getAllByText, getAllByTestId } = renderWithRouter(<App />);
  const buttonsType = getAllByTestId('pokemon-type-button');
  const sevenButons = 7;

  expect(buttonsType.length).toBe(sevenButons);

  pokemons.forEach((element) => {
    expect(getAllByText(element.type)[0]).toBeInTheDocument();
  });
});

test('se a página possui o botão All', async () => {
  const { getByText, queryByText } = renderWithRouter(<App />);
  const buttonAll = getByText(/All/i);
  expect(buttonAll).toBeInTheDocument();

  fireEvent.click(getByText(/Dragon/i));
  expect(queryByText(/Pikachu/i)).toBeNull();
  fireEvent.click(buttonAll);
  expect(getByText(/Pikachu/i)).toBeInTheDocument();
});
