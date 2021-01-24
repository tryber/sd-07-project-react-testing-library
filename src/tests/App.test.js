import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { NotFound } from '../components';

describe('Testando App.js', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  it('testa se a página principal da Pokédex é renderizada no caminho de URL "/"', () => {
    const { history } = renderWithRouter(<App />);
    const expected = history.entries[0].pathname;

    expect(expected).toBe('/');
  });
  it('testa se a aplicação contém um conjunto fixo de links de navegação.', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    const about = getByText(/About/i);
    const favoritePokemons = getByText(/Favorite Pokémons/i);

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });
  it('testa se o link "Home" redireciona para "/"', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    fireEvent.click(home);
    const path = history.entries[0].pathname;

    expect(path).toBe('/');
  });
  it('testa se o link "About" redireciona para "/about"', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const about = getByText(/About/i);
    fireEvent.click(about);
    const path = history.location.pathname;

    expect(path).toBe('/about');
  });
  it('testa se o link "Favorite Pokémons" redireciona para "/favorites"', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const favorites = getByText(/Favorite Pokémons/i);
    fireEvent.click(favorites);
    const path = history.location.pathname;

    expect(path).toBe('/favorites');
  });
  it('testa se uma URL desconhecida redireciona para "/notfound"', () => {
    const { history, getByText } = renderWithRouter(<NotFound />);
    history.location.pathname = '/pikachu';

    const notFound = getByText('not found', { exact: false });

    expect(notFound).toBeInTheDocument();
  });
});
