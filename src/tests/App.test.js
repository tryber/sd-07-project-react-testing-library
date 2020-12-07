import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('Testando links de navegação', () => {
  test('Teste se o topo da aplicação contém um conjunto de links de navegação', () => {
    const { getByText } = renderWithRouter(<App />);

    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();

    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();

    const favoritePokemon = getByText(/Favorite Pokémons/i);
    expect(favoritePokemon).toBeInTheDocument();
  });

  test('Teste se a aplicação navega da home para URL / ao clicar no link Home', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const home = getByText(/Home/i);

    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Aplicação navega da página About para URL /about ao clicar no link About', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const about = getByText(/About/i);

    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Navega de Pokémons Favoritados para /favorites clicando no link Favorite', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const favorites = getByText(/Favorite/i);

    fireEvent.click(favorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('É redirecionada para página Not Found ao entrar em uma URL desconhecida', () => {
    const { getByText, history } = renderWithRouter(<App />);

    const route = '/xablau';
    history.push(route);

    const pageNotFound = getByText(/Page requested not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
