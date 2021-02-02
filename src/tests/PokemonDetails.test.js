import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o arquivo PokemonDetails.js', () => {
  it('testa se exibe os detalhes do pokémon selecionado', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);

    const details = getByText('More details');
    fireEvent.click(details);

    const pokeName = getByText('Pikachu Details');
    expect(pokeName).toBeInTheDocument();

    expect(details).not.toBeInTheDocument();

    const summary = getByRole('heading', { name: 'Summary' });
    expect(summary.tagName).toBe('H2');

    expect(summary.nextElementSibling.tagName).toBe('P');
    expect(summary.nextElementSibling).toHaveTextContent('This intelligent Pokémon');

  });
  it('Teste se exibe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);

    const details = getByText('More details');
    fireEvent.click(details);

    const headingLocations = getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(headingLocations.tagName).toBe('H2');

    const locations = getAllByAltText('Pikachu location');
    const length = 2;
    expect(locations.length).toBe(length);

    const source = 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const nameLocation = getByText('Kanto Viridian Forest');

    expect(locations[0].src).toBe(source);
    expect(nameLocation).toBeInTheDocument();
  });
  it('testa se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const {
      getByLabelText,
      getByText,
      getByRole,
      getByAltText,
    } = renderWithRouter(<App />);

    const details = getByText('More details');
    fireEvent.click(details);

    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.id).toBe('favorite');

    const toFavorite = getByLabelText('Pokémon favoritado?');

    fireEvent.click(toFavorite);
    const isFavorite = getByAltText('Pikachu is marked as favorite');

    expect(isFavorite).toBeInTheDocument();

    fireEvent.click(toFavorite);
    expect(isFavorite).not.toBeInTheDocument();
  });
});
