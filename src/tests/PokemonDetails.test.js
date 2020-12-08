import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{ component }</Router>), history,
  });
};

describe('Teste se as informações detalhadas do Pokémon', () => {
  test('check pokemon name', () => {
    const { history, getByText } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const nameDetail = getByText(/pikachu details/i);
    expect(nameDetail).toBeInTheDocument();
  });

  test('there is no link to details', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const moreInformation = getByText('More details');
    history.push('/pokemons/25');
    expect(moreInformation).not.toBeInTheDocument();
  });

  test('a heading Summary', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const summary = getByText(/summary/i);
    expect(summary).toBeInTheDocument();
  });

  test('if have a paragraph', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const match = /This intelligent Pokémon roasts hard berries with electricity/i;
    const paragraph = getByText(match);
    expect(paragraph).toBeInTheDocument();
  });
});

describe('Teste os mapas dos pokémons', () => {
  test('heading dos mapas', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const heading = getByText(/Game Locations of Pikachu/i);
    expect(heading).toBeInTheDocument();
  });

  test('name and map of localization', () => {
    const { getAllByAltText, getByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const map1Localization = getByText(/Kanto Viridian Forest/i);
    const map2Localization = getByText(/Kanto Power Plant/i);
    const mapsImages = getAllByAltText(/pikachu location/i);
    expect(map1Localization && map2Localization).toBeInTheDocument();
    expect(mapsImages[0] && mapsImages[1]).toBeInTheDocument();
    expect(mapsImages[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapsImages[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('', () => {
    const { getByLabelText, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const favorite = getByLabelText(/pokémon favoritado/i);
    expect(favorite).toBeInTheDocument();
  });
});
