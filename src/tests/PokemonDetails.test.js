import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o arquivo PokemonDetails.js', () => {
  test('informações do Pokémon selecionado são mostradas na tela', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const moreDetailsBtn = getByText(/More details/i);
    fireEvent.click(moreDetailsBtn);
    expect(getByText(/Pikachu Details/i)).toBeInTheDocument();
    expect(moreDetailsBtn).not.toBeInTheDocument();
    expect(getByRole('heading', { name: /Summary/i })).toBeInTheDocument();
    expect(getByText(/This intelligent Pokémon/i)).toBeInTheDocument();
  });

  it('existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { getByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
    const moreDetailsBtn = getByText(/More details/i);
    fireEvent.click(moreDetailsBtn);
    expect(getByRole('heading', { name: /Game Locations of Pikachu/i }))
      .toBeInTheDocument();
    expect(getByText(/Kanto Viridian Forest/i)).toBeInTheDocument();
    expect(getByText(/Kanto Power Plant/i)).toBeInTheDocument();
    const locations = getAllByAltText(/Pikachu location/i);
    expect(locations[0]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locations[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { getByText, getByRole, getByAltText } = renderWithRouter(<App />);
    const moreDetailsBtn = getByText(/More details/i);
    fireEvent.click(moreDetailsBtn);
    const favoriteBtn = getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favoriteBtn).toBeInTheDocument();
    fireEvent.click(favoriteBtn);
    const favoriteStar = getByAltText('Pikachu is marked as favorite');
    expect(favoriteStar).toBeInTheDocument();
    fireEvent.click(favoriteBtn);
    expect(favoriteStar).not.toBeInTheDocument();
  });
});
