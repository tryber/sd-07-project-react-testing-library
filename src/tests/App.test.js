import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testing routes from the main file', () => {
  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});

describe('Teste de links de navegação', () => {
  it('testando se os links da aplicação estão no topo da página', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    const about = getByText(/About/i);
    const favotitePokemons = getByText(/Favorite Pokémons/i);
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favotitePokemons).toBeInTheDocument();
  });
});

describe('Testando redirecionamentos da aplicação', () => {
  it('Testando navegação para página Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();
    fireEvent.click(getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testando navegação para About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const about = getByText(/About/i);
    expect(about).toBeInTheDocument();
    fireEvent.click(getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testando navegação para página Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favorite = getByText(/Favorite Pokémons/i);
    expect(favorite).toBeInTheDocument();
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testando navegação para página Not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const route = '/paginaTeste';
    history.push(route);
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
