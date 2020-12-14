import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa App.js - requirement1', () => {
  it('A Pokédex é renderizada ao carregar a aplicação no path de URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const tittle = getByText(/Pokédex/i);
    expect(tittle).toBeInTheDocument();
  });

  it('O topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkElementHome = getByText(/Home/i);
    const linkElementAbout = getByText(/About/i);
    const linkElementFavoritePokemon = getByText(/Favorite Pokémons/i);

    fireEvent.click(linkElementHome);
    fireEvent.click(linkElementAbout);
    fireEvent.click(linkElementFavoritePokemon);

    expect(linkElementHome).toBeInTheDocument();
    expect(linkElementAbout).toBeInTheDocument();
    expect(linkElementFavoritePokemon).toBeInTheDocument();
  });

  it('A aplicação é direcionada para a página inicial na URL / ao clicar em Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('A aplicação é direcionada para página About na URL /about ao clicar About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('A aplicação direcionada P. Favoritados na /favorites ao click Favorite P.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('A aplicação é direcionada a página Not Found em uma URL desconhecida.', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
