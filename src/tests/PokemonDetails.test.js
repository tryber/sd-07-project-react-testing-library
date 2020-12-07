import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Testing PokemonDetails.js functionality', () => {
  it('Should have detailed pokemon information', () => {
    const { getByText, history, getAllByRole } = renderWithRouter(<App />);

    const moreDetails = getByText(/more details/i);
    history.push('/pokemons/4');
    const charmanderDetailsText = getByText(/Charmander Details/i);
    expect(charmanderDetailsText).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    const h2 = getAllByRole('heading', { level: 2 });
    expect(h2[1].tagName.toLowerCase()).toBe('h2');
    expect(h2[2].innerHTML).toBe('Summary');
    expect(h2[2]).toBeInTheDocument();
    const tagP = getByText(/The flame on its tail shows the strength of its life/i);
    expect(tagP).toBeInTheDocument();
  });

  it('Should have maps about the current pokemon', () => {
    const {
      getByText,
      getAllByRole,
      history,
      getAllByAltText,
    } = renderWithRouter(<App />);

    history.push('/pokemons/25');
    const h2 = getAllByRole('heading', { level: 2 });
    expect(h2[3].tagName.toLowerCase()).toBe('h2');
    expect(h2[3].innerHTML).toBe('Game Locations of Pikachu');
    const location1 = getByText('Kanto Viridian Forest');
    expect(location1.innerHTML).toBe('Kanto Viridian Forest');
    const location2 = getByText('Kanto Power Plant');
    expect(location2.innerHTML).toBe('Kanto Power Plant');
    const imgAltText = getAllByAltText(/pikachu location/i);
    expect(imgAltText[0]).toBeInTheDocument();
    expect(imgAltText[0]).toHaveAttribute('src',
      'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgAltText[1]).toBeInTheDocument();
    expect(imgAltText[1]).toHaveAttribute('src',
      'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('checks if the user can favor the pokemon', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);

    history.push('/pokemons/25');
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
    const isThePokemonFavoriteMensage = getByText(/Pokémon favoritado?/i);
    expect(isThePokemonFavoriteMensage).toBeInTheDocument();
  });
});
