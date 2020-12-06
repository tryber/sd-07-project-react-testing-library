import React from 'react';

import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import data from '../data';
import App from '../App';

describe('7. Testando o arquivo PokemonDetails.js', () => {
  const defaultPokemon = data[0];
  test('Deve conter o texto details na tela', () => {
    const { getByText, getAllByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    const detailsTitle = getByText(/Pikachu Details/i);
    const justOne = getAllByText(/Details/i);

    expect(detailsTitle).toBeInTheDocument();
    expect(justOne.length).toBe(1);
    expect(getByText(/Summary/i)).toBeInTheDocument();
    expect(getByText(defaultPokemon.summary)).toBeInTheDocument();
  });

  test('localizações pokemon', () => {
    const { getByText, container } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));

    expect(getByText(`Game Locations of ${defaultPokemon.name}`)).toBeInTheDocument();
    defaultPokemon.foundAt.forEach(({ location, map }) => {
      expect(container.querySelector(`[src="${map}"]`)).toBeInTheDocument();
      expect(
        container.querySelector(`[alt="${defaultPokemon.name} location"]`),
      ).toBeInTheDocument();
    });
  });

  test('Se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    const { getByText} = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));

    expect(getByText(/Pokémon favoritado/i)).toBeInTheDocument();
  });
});
