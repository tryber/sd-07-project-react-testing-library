import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o arquivo App.js', () => {
  it('o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText('Home');
    const about = getByText('About');
    const favoritePokemons = getByText('Favorite Pokémons');
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });

  it('ao clicar no link Home da barra de navegação, redireciona pra página /home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText('Home');
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('ao clicar no link About, redireciona pra página /about', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText('About');
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('ao clicar no link Favorite Pokémons, redireciona pra página /favorites', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoritePokemons = getByText('Favorite Pokémons');
    fireEvent.click(favoritePokemons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('ao entrar em uma URL desconhecida, redireciona pra página /not-found', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push('/not-found');
    const
      noMatch = getByAltText('Pikachu crying because the page requested was not found');
    expect(noMatch).toBeInTheDocument();
  });
});
