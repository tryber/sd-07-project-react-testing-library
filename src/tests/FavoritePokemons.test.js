import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('tsets for Favorite Pokemons component', () => {
  it('render a message `No favorite pokemon found` without a favorite pokemos', () => {
    const { getByText } = render(<FavoritePokemons />);
    const favorite = getByText(/No favorite pokemon found/i);
    expect(favorite).toBeInTheDocument();
  });

  it('render all favorites pokemon', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeTruthy();
    history.push('/pokemons/4');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeTruthy();
    history.push('/favorites');
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const charmander = getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
  });

  it('not render pokemon not be a favorite', () => {
    const { getByRole, queryByText, history } = renderWithRouter(<App />);
    history.push('/pokemons/151');
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeTruthy();
    history.push('/favorites');
    const dragonair = queryByText(/Dragonair/i);
    expect(dragonair).not.toBeInTheDocument();
  });
});
