import { cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

afterEach(cleanup);

describe('Testando o arquivo PokemonDetails.js', () => {
  test('A página deve conter um texto <name> Details', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetails = getByText('More details');
    fireEvent.click(moreDetails);
    const title = getByText('Pikachu Details');
    expect(title).toBeInTheDocument();
    const sumary = getByText('Summary');
    expect(sumary).toBeInTheDocument();
    const paragraph = getByText(/This intelligent Pokémon/i);
    expect(paragraph.tagName).toBe('P');
  });

  test('Teste se existe na página uma seção com os mapas', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);
    const moreDetails = getByText('More details');
    fireEvent.click(moreDetails);
    const locationTitle = getByText('Game Locations of Pikachu');
    expect(locationTitle).toBeInTheDocument();
    const allLocation = getAllByAltText('Pikachu location');
    expect(allLocation[0]).toBeInTheDocument();
    expect(allLocation[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  test('Se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    const moreDetails = getByText('More details');
    fireEvent.click(moreDetails);
    const favorite = getByText('Pokémon favoritado?');
    expect(favorite).toBeInTheDocument();
    fireEvent.click(favorite);
    const imgFavorite = getByAltText('Pikachu is marked as favorite');
    expect(imgFavorite).toBeInTheDocument();
  });
});
