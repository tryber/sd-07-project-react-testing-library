import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('EX01 - Testando o arquivo App.js', () => {
  test('Texto "Pokédex" existe no App.js', () => {
    const { getByText } = RenderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Pokedex é renderizada no path "/"', () => {
    const { history } = RenderWithRouter(<App />);

    const path = history.location.pathname;
    expect(path).toBe('/');
  });

  test('Conjunto de Links: "Home", "About", "Favorite Pokémons"', () => {
    const { getByText } = RenderWithRouter(<App />);

    const link1 = getByText(/Home/i);
    const link2 = getByText(/About/i);
    const link3 = getByText(/Favorite Pokémons/i);

    expect(link1).toBeInTheDocument();
    expect(link2).toBeInTheDocument();
    expect(link3).toBeInTheDocument();
  });

  test('Link "Home" redireciona para "/"', () => {
    const { history, getByText } = RenderWithRouter(<App />);

    const linkHome = getByText(/Home/i);

    fireEvent.click(linkHome);

    const path = history.location.pathname;

    expect(path).toBe('/');
  });

  test('Link "About" redireciona para "/about"', () => {
    const { history, getByText } = RenderWithRouter(<App />);

    const linkAbout = getByText(/About/i);

    fireEvent.click(linkAbout);

    const path = history.location.pathname;

    expect(path).toBe('/about');
  });

  test('Link "Favorite Pokémons" redireciona para "/favorites"', () => {
    const { history, getByText } = RenderWithRouter(<App />);

    const linkFavorite = getByText(/Favorite Pokémons/i);

    fireEvent.click(linkFavorite);

    const path = history.location.pathname;

    expect(path).toBe('/favorites');
  });

  test('Redireciona para "Not Found" quando não encontra o path', () => {
    const { history, getByText } = RenderWithRouter(<App />);

    history.push('/xablau');

    const notFound = getByText(/Page requested not found/i);

    expect(notFound).toBeInTheDocument();
  });
});
