import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o arquivo Pokemon.js', () => {
  test('se as informações do Pokémon selecionado são mostradas na tela', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const moreDetailsButton = getByText(/More details/i);
    fireEvent.click(moreDetailsButton);
    expect(getByText(/Pikachu Details/i)).toBeInTheDocument();
    expect(moreDetailsButton).not.toBeInTheDocument();
    expect(getByRole('heading', { name: /Summary/i })).toBeInTheDocument();
    expect(getByText(/This intelligent Pokémon/i)).toBeInTheDocument();
  });

  it('se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
    const moreDetailsButton = getByText(/More details/i);
    fireEvent.click(moreDetailsButton);
    expect(getByRole('heading', { name: /Game Locations of Pikachu/i }))
      .toBeInTheDocument();
    expect(getByText(/Kanto Viridian Forest/i)).toBeInTheDocument();
    expect(getByText(/Kanto Power Plant/i)).toBeInTheDocument();
    const locations = getAllByAltText(/Pikachu location/i);
    expect(locations[0]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locations[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { getByText, getByRole, getByAltText } = renderWithRouter(<App />);
    const moreDetailsButton = getByText(/More details/i);
    fireEvent.click(moreDetailsButton);
    const favoriteButton = getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favoriteButton).toBeInTheDocument();
    fireEvent.click(favoriteButton);
    const favoriteStar = getByAltText('Pikachu is marked as favorite');
    expect(favoriteStar).toBeInTheDocument();
    fireEvent.click(favoriteButton);
    expect(favoriteStar).not.toBeInTheDocument();
  });
});
