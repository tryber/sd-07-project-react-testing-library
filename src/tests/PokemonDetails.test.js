import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Verificando o PokemonDetails', () => {
  it('Verifica informações detalhadas do pokemon', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetails = getByText('More details');
    fireEvent.click(moreDetails);
    const pokemonName = getByText('Pikachu Details');
    const summary = getByText('Summary');
    const paragraph = getByText(/This intelligent Pokémon roasts hard/);
    expect(pokemonName).toHaveTextContent('Pikachu Details');
    expect(summary).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    expect(pokemonName).not.toContainHTML('href');
    expect(summary).toContainHTML('h2');
  });
  it('Verifica informações detalhadas do pokemon (Mapa)', () => {
    const { getByText, getAllByAltText } = renderWithRouter(<App />);
    const moreDetails = getByText('More details');
    fireEvent.click(moreDetails);
    const mapName = getByText('Game Locations of Pikachu');
    const kantoCity = getByText('Kanto Power Plant');
    const kantoForest = getByText('Kanto Viridian Forest');
    const locations = getAllByAltText('Pikachu location');
    const locationsNumber = 2;
    expect(mapName).toBeInTheDocument();
    expect(mapName).toContainHTML('h2');
    expect(kantoCity).toBeInTheDocument();
    expect(kantoForest).toBeInTheDocument();
    expect(locations).toHaveLength(locationsNumber);
    expect(locations[1]).toContainHTML('alt="Pikachu location"');
    expect(locations[0]).toContainHTML('alt="Pikachu location"');
    expect(locations[1]).toContainHTML('src="https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png"');
    expect(locations[0]).toContainHTML('src="https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png"');
  });
  it('Verifica informações detalhadas do pokemon (Favoritar)', () => {
    const { getByText, queryByAltText, getByLabelText,
      getByRole } = renderWithRouter(<App />);
    const moreDetails = getByText('More details');
    fireEvent.click(moreDetails);
    const labelName = getByLabelText('Pokémon favoritado?');
    fireEvent.click(labelName);
    const favoritePikachu = queryByAltText('Pikachu is marked as favorite');
    const checkbox = getByRole('checkbox');
    expect(labelName).toBeInTheDocument();
    expect(favoritePikachu).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(labelName);
    expect(favoritePikachu).not.toBeInTheDocument();
  });
});
