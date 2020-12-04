import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRender from '../renderWithRouter';
import App from '../App';

describe('Testando o arquivo Pokemon Details', () => {
  it('Deve renderizar Pokemon Details ', () => {
    const { getByText } = renderWithRender(<App />);

    const details = getByText(/More details/i);

    fireEvent.click(details);

    const PokeDetails = getByText(/Pikachu Details/i);
    expect(PokeDetails).toBeInTheDocument();

    const sumarry = getByText(/Summary/i);
    expect(sumarry).toBeInTheDocument();
    expect(sumarry.tagName).toBe('H2');

    const summarryPara = getByText(/This intelligent Pokémon roasts/i);
    expect(summarryPara).toBeInTheDocument();
    expect(summarryPara.tagName).toBe('P');

    const locationGame = getByText(/Game Locations of Pikachu/i);
    expect(locationGame.tagName).toBe('H2');
  });

  it('Deve renderizar Location Pokemon Details ', () => {
    const { getByText, getAllByAltText } = renderWithRender(<App />);

    const details = getByText(/More details/i);

    fireEvent.click(details);

    const favoriteLocation = getAllByAltText(/Pikachu location/i);
    expect(favoriteLocation[0]).toBeInTheDocument();
    expect(favoriteLocation[0].src).toBe(
      'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );

    expect(favoriteLocation[1]).toBeInTheDocument();
    expect(favoriteLocation[1].src).toBe(
      'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
  });

  it('Deve renderizar Favorite Pokemon Details ', () => {
    const { getByText, getByAltText } = renderWithRender(<App />);

    const details = getByText(/More details/i);

    fireEvent.click(details);

    const favorite = getByText(/Pokémon favoritado?/i);
    fireEvent.click(favorite);

    const favoriteAlt = getByAltText(/Pikachu is marked as favorite/i);
    expect(favoriteAlt).toBeInTheDocument();

    fireEvent.click(favorite);

    expect(favoriteAlt).not.toBeInTheDocument();
  });
});
