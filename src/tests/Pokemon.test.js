import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
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
