import React from 'react';
// import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente App', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = renderWithRouter(<App />);

    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('If the Pokedex is rendered in the path "/"', () => {
    const { history } = renderWithRouter(<App />);

    const path = history.location.pathname;
    expect(path).toBe('/');
  });

  test('If the Links exist "Home", "About", "Favorite Pokémons"', () => {
    const { getByText } = renderWithRouter(<App />);

    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();
    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();
    const favoritePokemons = getByText(/Favorite Pokémons/i);
    expect(favoritePokemons).toBeInTheDocument();
  });
});
