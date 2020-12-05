import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('se as informações detalhadas do Pokemon selecionado estão na tela', () => {
  const { getByText, queryByText } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More details/i));
  expect(getByText(/Pikachu Details/i)).toBeInTheDocument();

  expect(queryByText(/More details/i)).toBeNull();

  expect(getByText(/Summary/i)).toBeInTheDocument();

  expect(
    getByText(/This intelligent Pokémon roasts hard/i)
  ).toBeInTheDocument();
});

test('se existem mapas com as localizações dos Pokemons', () => {
  const { getByText, getAllByAltText } = renderWithRouter(<App />);
  const numberMaps = 2;
  fireEvent.click(getByText(/More details/i));
  expect(getByText(/Game Locations of Pikachu/i)).toBeInTheDocument();

  expect(getAllByAltText(/Pikachu location/i).length).toBe(numberMaps);

  const maps = document.querySelectorAll('img');
  expect(maps[1].src).toBe(
    'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png'
  );
  expect(maps[2].src).toBe(
    'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png'
  );
});

test('se é possível favoritar um pokemon através da página de detalhes', () => {
  const {
    getByText,
    getByRole,
    getByLabelText,
    queryByText,
    getByAltText,
  } = renderWithRouter(<App />);
  fireEvent.click(getByText(/More details/i));
  const checkbox = getByLabelText(/Pokémon favoritado?/i);

  expect(getByRole('checkbox')).toBeInTheDocument();

  expect(checkbox).toBeInTheDocument();

  fireEvent.click(checkbox);
  expect(getByAltText(/Pikachu is marked as favorite/i)).toBeInTheDocument();
  fireEvent.click(checkbox);
  expect(queryByText(/Pikachu is marked as favorite/i)).toBeNull();
});
