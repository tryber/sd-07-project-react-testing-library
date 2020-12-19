import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
  const card = pokemons[7];
  const { getByText, getByAltText } = renderWithRouter(
    <Pokemon pokemon={ card } isFavorite={ false } />,
  );

  const name = getByText(card.name);
  const nameData = 'Snorlax';
  expect(name.textContent).toBe(nameData);

  const type = getByText(card.type);
  const typeData = 'Normal';
  expect(type.textContent).toBe(typeData);

  const averageWeightValue = card.averageWeight.value;
  const averageWeightUnit = card.averageWeight.measurementUnit;
  const weight = getByText(`Average weight: ${averageWeightValue} ${averageWeightUnit}`);
  const weightData = 'Average weight: 460.0 kg';
  expect(weight.textContent).toBe(weightData);

  const srcImageData = 'https://cdn.bulbagarden.net/upload/4/40/Spr_5b_143.png';

  const altImageData = getByAltText('Snorlax sprite');
  expect(altImageData.src).toBe(srcImageData);
});

test('Teste se o card contém um link para exibir detalhes do Pokémon', () => {
  const card = pokemons[7];
  const { getByText, history } = renderWithRouter(
    <Pokemon pokemon={ card } isFavorite={ false } />,
  );
  const linkDetails = getByText(/More details/i);
  fireEvent.click(linkDetails);

  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/143');
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  const card = pokemons[0];
  const { getByAltText } = renderWithRouter(
    <Pokemon pokemon={ card } isFavorite />,
  );
  const altImage = (`${card.name} is marked as favorite`);
  const altImageData = 'Pikachu is marked as favorite';
  expect(altImage).toBe(altImageData);

  const srcImage = '/star-icon.svg';
  const altImg = getByAltText(altImageData);
  expect(altImg).toHaveAttribute('src', srcImage);
});
